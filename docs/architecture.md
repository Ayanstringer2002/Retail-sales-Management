# Architecture Document

## Backend architecture
- Express.js server with a single public endpoint: `GET /api/sales`
- MongoDB (Mongoose) for data storage
- Single-service query builder to create filters, search, sorting, and pagination
- Models folder contains `Sale` Mongoose schema
- Controllers handle request/response and delegate to services

## Frontend architecture
- React (Vite) single page app
- Components:
  - SearchBar: submit search query
  - FilterPanel: multi-selects & ranges
  - SortDropdown: sorting selections
  - TransactionsTable: renders items
  - PaginationControls: page navigation
- Services:
  - api.js: axios wrapper to call `/api/sales`
- Hook:
  - useQueryState: centralized query state for search, filters, sort, page

## Data flow
1. User changes UI (search / filter / sort / page)
2. UI Updates centralized query state via `useQueryState`
3. `App` effect triggers fetchSales(query)
4. Backend receives query params, `salesService` builds Mongoose filters
5. Backend returns paginated result (items, totalCount, totalPages)
6. Frontend updates UI and pagination controls

## Folder structure
(As described in project layout above)

## Module responsibilities
- controllers/: request validation & response
- services/: business logic and DB query composition
- routes/: express route declarations
- models/: Mongoose schema
- frontend/components/: UI and interaction logic
- frontend/services/: API calls
