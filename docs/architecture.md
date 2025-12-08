# Architecture Document

## Backend architecture
- Node.js + Express server.
- MongoDB (Mongoose) for storage.
- Layered structure:
  - models/ : Mongoose schema (Sale.js)
  - services/ : Business logic, query construction (salesService.js)
  - controllers/ : Accepts HTTP, delegates to services (salesController.js)
  - routes/ : Express routes (salesRoutes.js)
  - utils/ : helpers (db.js)
- API: GET /api/sales accepts query parameters for search, filters, sort, pagination.

## Frontend architecture
- React app (Vite).
- Components:
  - SearchBar.jsx
  - FilterPanel.jsx
  - TransactionsTable.jsx
  - SortDropdown.jsx
  - PaginationControls.jsx
- services/api.js centralizes network calls.
- hooks/useQueryState.js: single source of truth for UI state, synced to URL.
- utils/helpers.js contains small utilities.

## Data flow
1. UI components update query state via useQueryState (URL sync).
2. TransactionsTable reads state and calls fetchSales(params) in services/api.js.
3. Backend receives query, salesController forwards to salesService.querySales().
4. salesService constructs a MongoDB query (supports $text search, $in for multi-selects,
   range queries for age and date) and executes it with pagination and sorting.
5. Response delivered to frontend, table renders results.

## Folder structure
(root)
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── routes/
│   │   ├── models/
│   │   └── index.js
│   └── scripts/seed.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── hooks/
│   │   └── styles/
└── docs/

## Module responsibilities
- Sale model: schema + text index for search.
- salesService: constructs MongoDB query and applies sorting & pagination.
- salesController: maps HTTP request to service call; handles errors.
- Frontend components: small focused UI pieces. No duplication of filter/sort logic: frontend just passes state to backend.
