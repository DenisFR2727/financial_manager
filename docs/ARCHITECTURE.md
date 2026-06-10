# Financial Manager — Architecture

## Overview

Монорепо для контролю місячних витрат. Frontend — **Feature-Sliced Design (FSD)** на React 19; backend — **Express 5 + Mongoose + MongoDB**. Клієнт спілкується з API через Axios; стан серверних даних — TanStack Query; обраний місяць — Zustand.

## Architecture Diagram

```mermaid
flowchart TB
    subgraph Client["Client (React + FSD)"]
        Pages["pages/"]
        Widgets["widgets/"]
        Features["features/"]
        Entities["entities/"]
        Shared["shared/"]
        Pages --> Widgets
        Pages --> Features
        Widgets --> Entities
        Features --> Entities
        Entities --> Shared
    end

    subgraph Server["Server (Express)"]
        Routes["routes/"]
        Models["models/"]
        Validation["validation/ (Zod)"]
        Routes --> Models
        Routes --> Validation
    end

    DB[(MongoDB)]

    Shared -->|Axios /api| Routes
    Models --> DB
```

## Data Flow (CRUD Expense)

```mermaid
sequenceDiagram
    participant UI as ExpensesPage
    participant Hook as useCreateExpense
    participant API as expenseApi
    participant Server as expenseRoutes
    participant DB as MongoDB

    UI->>Hook: mutate(formData)
    Hook->>API: POST /expenses
    API->>Server: JSON body
    Server->>Server: Zod validate
    Server->>DB: Expense.create()
    DB-->>Server: document
    Server-->>API: populated expense
    API-->>Hook: success
    Hook->>Hook: invalidateQueries
    Hook-->>UI: UI refetch
```

## ER Diagram

```mermaid
erDiagram
    CATEGORY ||--o{ EXPENSE : "has"
    CATEGORY {
        ObjectId _id PK
        string name UK
        string color
        string icon
    }
    EXPENSE {
        ObjectId _id PK
        number amount
        ObjectId categoryId FK
        date date
        string description
    }
```

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Список категорій |
| GET | `/api/expenses?month=YYYY-MM` | Витрати за місяць |
| POST | `/api/expenses` | Створити витрату |
| PUT | `/api/expenses/:id` | Оновити витрату |
| DELETE | `/api/expenses/:id` | Видалити витрату |
| GET | `/api/analytics/by-category?month=` | Агрегація по категоріях |
| GET | `/api/analytics/monthly-total?month=` | Загальна сума за місяць |

## Key Design Decisions

- **Zod** на backend для валідації тіла запиту та формату місяця.
- **TanStack Query** з інвалідацією `expenses` + `analytics` після мутацій.
- **Zustand** лише для глобального фільтра місяця (мінімальний клієнтський стан).
- **Recharts PieChart** з кольорами з колекції `categories`.
- **Українська локалізація** через `Intl` (`uk-UA`, UAH).

## Seed Categories

```bash
npm run seed -w server
```

Дефолтні категорії: Їжа, Транспорт, Розваги, Комунальні, Інше.
