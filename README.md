# Financial Manager

Монорепо для контролю місячних витрат. Архітектура: **FSD** (frontend) + **Express/MongoDB** (backend).

Детальна документація: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## Структура

```
financial_manager/
├── client/     # React 19 + TypeScript + SCSS + FSD
├── server/     # Express + Mongoose + MongoDB
└── docs/       # Архітектура та API
```

## Швидкий старт

1. Скопіюйте `.env.example` → `.env` і вкажіть `MONGODB_URI`.
2. Встановіть залежності:

```bash
npm install
```

3. Засійте дефолтні категорії:

```bash
npm run seed -w server
```

4. Запуск (client + server):

```bash
npm run dev
```

- Client: http://localhost:5173
- Server: http://localhost:3001

## Маршрути UI

| Шлях | Сторінка |
|------|----------|
| `/` | Дашборд — підсумок, діаграма по категоріях |
| `/expenses` | CRUD витрат за обраний місяць |

## Стек

**Client:** React 19, TypeScript, SCSS (BEM modules), TanStack Query, Zustand, Recharts, React Router, Axios

**Server:** Express 5, Mongoose, Zod, MongoDB Atlas
