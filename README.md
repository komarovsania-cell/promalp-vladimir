# ВинСтарКом — сайт промышленного альпинизма

Next.js 14 (App Router) + Tailwind + GSAP. Данные по услугам и ценам взяты с объявления Авито № 8170318690.

## Что сделано

- Премиальный тёмный дизайн, шрифты Unbounded (заголовки) + Inter (текст)
- - Собственные векторные SVG-иконки (без эмодзи)
  - - Плавные GSAP-анимации появления секций и карточек при скролле
    - - Форма заявки на сайте -> API-роут /api/lead -> запись в leads.xlsx на Яндекс Диске
      - - Готово к деплою на Vercel
       
        - ## Запуск локально
       
        - npm install
        - cp .env.local.example .env.local
        - npm run dev
       
        - Впишите в .env.local ваш YANDEX_DISK_TOKEN перед запуском.
       
        - ## Деплой на Vercel
       
        - npm install -g vercel
        - vercel login
        - vercel link
        - vercel env add YANDEX_DISK_TOKEN production
        - vercel --prod
       
        - ## Переменные окружения
       
        - YANDEX_DISK_TOKEN — OAuth-токен Яндекс Диска (Управление файлами и папками)
        - YANDEX_DISK_LEADS_PATH — путь к файлу заявок на Диске, по умолчанию /leads.xlsx
       
        - ## Структура
       
        - - src/app/page.tsx — сборка секций главной страницы
          - - src/components/ — Header, Hero, About, Services, Coverage, Process, ContactForm, Footer, иконки
            - - src/data/services.ts — услуги и цены (данные с Авито)
              - - src/app/api/lead/route.ts — приём заявок и запись в Яндекс Диск
                - 
