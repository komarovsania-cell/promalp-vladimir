const API_BASE = "https://cloud-api.yandex.net/v1/disk/resources";

export function authHeaders(token: string) {
  return { Authorization: "OAuth " + token };
}

export async function ensureFolder(token: string, path: string) {
  const res = await fetch(API_BASE + "?path=" + encodeURIComponent(path), {
    method: "PUT",
    headers: authHeaders(token),
  });
  if (!res.ok && res.status !== 409) {
    throw new Error("Yandex Disk folder error: " + res.status);
  }
}

export type DiskItem = {
  name: string;
  path: string;
  created: string;
  size: number;
};

export async function listFolder(token: string, path: string): Promise<DiskItem[]> {
  const fields =
    "_embedded.items.name,_embedded.items.path,_embedded.items.created,_embedded.items.size,_embedded.items.type";
  const url =
    API_BASE + "?path=" + encodeURIComponent(path) + "&limit=200&fields=" + fields;
  const res = await fetch(url, { headers: authHeaders(token) });
  if (res.status === 404) return [];
  if (!res.ok) throw new Error("Yandex Disk list error: " + res.status);
  const data = await res.json();
  const items = (data._embedded?.items || []) as any[];
  return items
    .filter((it) => it.type === "file")
    .map((it) => ({ name: it.name, path: it.path, created: it.created, size: it.size }))
    .sort((a, b) => (a.created < b.created ? 1 : -1));
}

export async function downloadFile(token: string, path: string): Promise<ArrayBuffer | null> {
  const linkRes = await fetch(API_BASE + "/download?path=" + encodeURIComponent(path), {
    headers: authHeaders(token),
  });
  if (linkRes.status === 404) return null;
  if (!linkRes.ok) throw new Error("Yandex Disk download-link error: " + linkRes.status);
  const { href } = await linkRes.json();
  const fileRes = await fetch(href);
  if (!fileRes.ok) throw new Error("Yandex Disk file fetch error: " + fileRes.status);
  return fileRes.arrayBuffer();
}

export async function uploadFile(
  token: string,
  path: string,
  data: ArrayBuffer | Buffer,
  contentType = "application/octet-stream"
) {
  const uploadLinkRes = await fetch(
    API_BASE + "/upload?path=" + encodeURIComponent(path) + "&overwrite=true",
    { headers: authHeaders(token) }
  );
  if (!uploadLinkRes.ok) {
    throw new Error("Yandex Disk upload-link error: " + uploadLinkRes.status);
  }
  const { href, method } = await uploadLinkRes.json();

  const putRes = await fetch(href, {
    method: method || "PUT",
    body: data as any,
    headers: { "Content-Type": contentType },
  });
  if (!putRes.ok && putRes.status !== 201 && putRes.status !== 202) {
    throw new Error("Yandex Disk upload error: " + putRes.status);
  }
}

export async function deleteFile(token: string, path: string) {
  const res = await fetch(
    API_BASE + "?path=" + encodeURIComponent(path) + "&permanently=true",
    { method: "DELETE", headers: authHeaders(token) }
  );
  if (!res.ok && res.status !== 204 && res.status !== 202) {
    throw new Error("Yandex Disk delete error: " + res.status);
  }
}
