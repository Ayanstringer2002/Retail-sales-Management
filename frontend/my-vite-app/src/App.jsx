import React from 'react';
import TransactionsTable from './components/TransactionsTable';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';
import PaginationControls from './components/PaginationControls';
import './styles/main.css';


export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Retail Sales Management</h1>
      </header>
      <main className="app-main">
        <div className="controls">
          <SearchBar />
          <SortDropdown />
        </div>
        <div className="layout">
          <aside className="filters">
            <FilterPanel />
          </aside>
          <section className="table-section">
            <TransactionsTable />
            <PaginationControls />
          </section>
        </div>
      </main>
    </div>
  );
}
