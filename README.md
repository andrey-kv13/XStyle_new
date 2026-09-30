# X-STYLE Web

Промо-сайт бренда X-STYLE: каталог дверей и паркета, интерактивная «Мастерская», страницы салонов и оплаты.

Стек: **Next.js 16** (App Router), **React 19**, **Tailwind CSS 4**, **GSAP** (горизонтальный маршрут `/workshop`).

## Требования

- Node.js **20+**
- npm 10+

## Быстрый старт

```bash
npm ci
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Скрипты

| Команда | Назначение |
|---------|------------|
| `npm run dev` | Dev-сервер |
| `npm run build` | Production-сборка |
| `npm run start` | Запуск после `build` |
| `npm run lint` | ESLint |
| `npm run typecheck` | Проверка TypeScript |

## Структура

```
src/
  app/              — маршруты Next.js
  components/       — UI и страницы
  data/             — JSON: тексты, каталоги дверей и паркета
  lib/              — контент, каталог, бренд
public/media/       — локальные изображения для текстовых страниц
scripts/            — обновление каталогов с Tilda API (опционально)
```

## Данные каталога

- `src/data/doors-catalog.json` — межкомнатные двери (Tilda Store API).
- `src/data/parquet-catalog.json` — паркетная доска.
- `src/data/site-content.json` — тексты и навигация статических страниц.
- `src/lib/brand-content.ts` — контакты, оплата, «О компании» (редактируется в коде).

Обновление каталогов с источника (нужен Python 3.11+):

```bash
pip install -r scripts/requirements.txt
python scripts/fetch_doors_catalog.py
python scripts/fetch_parquet_catalog.py
```

## Деплой

Сборка статики/SSR через `npm run build`. Подходит для Vercel, Docker или любого Node-хостинга с поддержкой Next.js 16.

Переменные окружения не обязательны; при необходимости создайте `.env.local` (файл в `.gitignore`).

## Лицензия

Проприетарный проект X-STYLE. Распространение кода — только с согласия правообладателя.
