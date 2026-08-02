import type { SVGProps } from "react";

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconCarabiner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M8 3.5a4.5 4.5 0 0 1 4.5 4.5v9a3.5 3.5 0 1 1-3.5-3.5H15" />
      <path d="M15 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
      <circle cx="8.5" cy="6" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconBolt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12.5 2.5 4 14h6l-1.5 7.5L20 10h-6l-1.5-7.5Z" />
    </svg>
  );
}

export function IconWrenchBolt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 4.9L3 17.5V21h3.5l6.3-6.3a4 4 0 0 0 4.9-5.4l-2.8 2.8-2.1-2.1 2.9-2.8Z" />
    </svg>
  );
}

export function IconDroplet(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3s6.5 7.1 6.5 11.5a6.5 6.5 0 1 1-13 0C5.5 10.1 12 3 12 3Z" />
      <path d="M9 15.2c0 1.4 1.1 2.5 2.5 2.5" />
    </svg>
  );
}

export function IconRoller(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="12" height="6" rx="1.5" />
      <path d="M9 11v3" />
      <path d="M9 14h6a2 2 0 0 1 2 2v5" />
      <circle cx="17" cy="21" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconHammer(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M14.5 5.5 18.5 9.5 16.8 11.2 12.8 7.2Z" />
      <path d="M14 9 4 19v1.5H5.5L15.5 10.5" />
      <path d="M16.5 3.5c1.8-.6 3.6.4 4.3 2 .3.7-.1 1.5-.9 1.7l-2.1.5-1.6-1.6.5-2.1c.1-.4.4-.4-.2-.5Z" />
    </svg>
  );
}

export function IconGarland(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 6c4 5 15 5 19 0" />
      <circle cx="6" cy="10.2" r="1" fill="currentColor" stroke="none" />
      <circle cx="10.2" cy="12.6" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="18.3" cy="10.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconShield(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 4.5 6v6c0 5 3.4 8.2 7.5 9 4.1-.8 7.5-4 7.5-9V6L12 3Z" />
      <path d="M8.7 12.2 11 14.5l4.3-4.6" />
    </svg>
  );
}

export function IconDocument(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M7 2.5h7l4 4V21a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z" />
      <path d="M14 2.5V7h4" />
      <path d="M8.5 12h7M8.5 15.2h7M8.5 18.4h4.5" />
    </svg>
  );
}

export function IconClock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.5l3.8 2.2" />
    </svg>
  );
}

export function IconTeam(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="8.5" cy="7.5" r="3" />
      <circle cx="16.2" cy="9" r="2.4" />
      <path d="M2.8 20c.6-3.6 3-5.6 5.7-5.6s5.1 2 5.7 5.6" />
      <path d="M14.8 14.8c2.3.2 4 1.9 4.5 5.2" />
    </svg>
  );
}

export function IconMapPin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21.5s7-6.6 7-12.2A7 7 0 0 0 5 9.3c0 5.6 7 12.2 7 12.2Z" />
      <circle cx="12" cy="9.2" r="2.4" />
    </svg>
  );
}

export function IconPhone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5C10.7 18.1 5.9 13.3 4 6.6a1.5 1.5 0 0 1 1.5-1.6Z" />
    </svg>
  );
}

export function IconArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16" />
      <path d="M14 6l6 6-6 6" />
    </svg>
  );
}

export function IconCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12.5 9.5 17 19 6.5" />
    </svg>
  );
}

export function IconRig(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="4.2" r="1.6" />
      <path d="M12 6v6" />
      <path d="M12 8.5 7 11" />
      <path d="M12 8.5 17 11" />
      <path d="M8 22l2.2-8.5" />
      <path d="M16 22l-2.2-8.5" />
      <path d="M9 13h6" />
    </svg>
  );
}

export function IconWind(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8h11.5a2.5 2.5 0 1 0-2.5-2.5" />
      <path d="M3 12.5h15a2.5 2.5 0 1 1-2.5 2.5" />
      <path d="M3 17h9a2 2 0 1 1-2 2" />
    </svg>
  );
}

export function IconLayers(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 16l9 5 9-5" />
    </svg>
  );
}

export function IconRuble(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M8 21V4h4.2a4 4 0 1 1 0 8H8" />
      <path d="M6 14h9M6 17h9" />
    </svg>
  );
}
