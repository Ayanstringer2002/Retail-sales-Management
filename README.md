# Retail Sales Management System

## Overview
A MERN-stack Retail Sales Management System implementing advanced search, multi-select filters, sorting, and pagination on a structured sales dataset. Backend exposes a single paginated endpoint; frontend is a React app that preserves search/filter/sort state across navigation.

## Tech Stack
- Frontend: React (Vite), Axios
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Dev: Vite, nodemon
- Deployment: (suggested) Vercel/Netlify for frontend, Render/Heroku for backend. MongoDB Atlas for DB.

## Search Implementation Summary
Search is implemented server-side in the single `/api/sales` endpoint. It supports case-insensitive search across `customer.name` and `customer.phoneNumber` using regex. A text index is optionally created for higher performance (see model). Search is combined with filters and sorting on the server.

## Filter Implementation Summary
Filters are expressed as query parameters (comma-separated for multi-selects). Supported filters: `regions`, `genders`, `ageMin`, `ageMax`, `productCategories`, `tags`, `paymentMethods`, `startDate`, `endDate`. All filters are combined with AND semantics; tags use `$in` to ensure presence of any selected tag. Filters are processed in backend service to build a single MongoDB query.

## Sorting Implementation Summary
Sorting is controlled by `sortBy` query param. Supported options: `date_desc`, `date_asc`, `quantity_desc`, `customer_asc`. Sorting is applied server-side and preserved alongside search and filters.

## Pagination Implementation Summary
Pagination uses query params `page` and `pageSize` (default pageSize = 10). Endpoint returns `totalCount`, `page`, `pageSize`, `totalPages`, and `items`. Frontend uses `Previous` / `Next` buttons and preserves search/filter/sort across pages.

## Setup Instructions
1. Clone repository.
2. Backend:
   - `cd backend`
   - create `.env` with `MONGODB_URI` and `PORT`
   - `npm install`
   - `npm run dev`
   - import dataset into MongoDB (use `mongoimport` or write a small script to read CSV/JSON and `Sale.create()`).
3. Frontend:
   - `cd frontend`
   - create `.env` with `VITE_API_BASE` (e.g. `http://localhost:5000/api`)
   - `npm install`
   - `npm run dev`
4. Open frontend (default `http://localhost:5173`) and the app will query backend.
