# ВинСтарКом — сайт промышленного альпинизма

Next.js 14 (App Router) + Tailwind + GSAP. Данные по услугам и ценам взяты с объявления Авито № 8170318690.

## Что сделано

- Премиальный тёмный дизайн, шрифты Unbounded (заголовки) + Inter (текст)
- Собственные векторные SVG-иконки (без эмодзи)
- Плавные GSAP-анимации появления секций и карточек при скролле
- Форма заявки на сайте → API-роут `/api/lead` → запись в `leads.xlsx` на Яндекс Диске
- Раздел «Портфолио» с реальными фото объектов + самостоятельная загрузка новых фото
- Готово к деплою на Vercel

## Запуск локально

```bash
npm install
cp .env.local.example .env.local
# впишите в .env.local ваш YANDEX_DISK_TOKEN
npm run dev
```

## Деплой на Vercel

Из-за сетевых ограничений текущей рабочей среды Claude не смог выполнить `npm install` и деплой самостоятельно (доступ в интернет из песочницы ограничен только доменами Anthropic). Всё остальное — код, дизайн, анимации, интеграция с Яндекс Диском — полностью готово. Чтобы опубликовать сайт, выполните на своём компьютере:

```bash
npm install -g vercel
cd promalp-site
npm install
vercel login   # либо: vercel --token ВАШ_VERCEL_TOKEN
vercel link    # создаст/подключит проект
vercel env add YANDEX_DISK_TOKEN production   # вставьте ваш OAuth-токен Яндекс Диска
vercel --prod  # либо: vercel --prod --token ВАШ_VERCEL_TOKEN
```

Это займёт около 5 минут. После деплоя Vercel выдаст вам публичную ссылку на сайт.

### Если хотите, чтобы деплой выполнил я

Откройте в Cowork: Admin settings → Capabilities → Network access, и разрешите исходящий доступ к доменам `registry.npmjs.org`, `vercel.com`, `api.vercel.com`, `cloud-api.yandex.net`. После этого напишите мне — я установлю зависимости, соберу и задеплою сайт сам, используя присланные вами токены.

## Переменные окружения

| Переменная | Назначение |
|---|---|
| `YANDEX_DISK_TOKEN` | OAuth-токен Яндекс Диска (Управление файлами и папками) |
| `YANDEX_DISK_LEADS_PATH` | Путь к файлу заявок на Диске, по умолчанию `/leads.xlsx` |
| `YANDEX_DISK_PORTFOLIO_PATH` | Папка на Диске для фото портфолио, по умолчанию `/portfolio-uploads` |
| `ADMIN_UPLOAD_PASSWORD` | Пароль для страницы загрузки фото `/admin/portfolio` |

## Портфолио и загрузка своих фото

На сайте есть раздел «Портфолио» с готовыми фото объектов. Чтобы добавить свои фото
без участия разработчика, откройте `/admin/portfolio` на сайте, введите пароль
(`ADMIN_UPLOAD_PASSWORD`) и загрузите фото — они сразу появятся на сайте (хранятся
на Яндекс Диске в папке `YANDEX_DISK_PORTFOLIO_PATH`, доступ через это же приложение).

## Структура

- `src/app/page.tsx` — сборка секций главной страницы
- `src/components/` — Header, Hero, About, Services, Portfolio, Coverage, Process, ContactForm, Footer, иконки
- `src/data/services.ts` — услуги и цены (данные с Авито)
- `src/app/api/lead/route.ts` — приём заявок и запись в Яндекс Диск (создаёт `leads.xlsx`, если его ещё нет, и дописывает строки)
- `src/app/api/portfolio/` — список/загрузка/удаление фото портфолио через Яндекс Диск
- `src/app/admin/portfolio/page.tsx` — страница самостоятельной загрузки фото
