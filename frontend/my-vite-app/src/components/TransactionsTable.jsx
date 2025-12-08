import React, { useEffect, useState } from 'react';
import { fetchSales } from '../services/api';
import useQueryState from '../hooks/useQueryState';

export default function TransactionsTable() {
  const [qs] = useQueryState({});
  const [data, setData] = useState({ results: [], total: 0, page: 1, pageSize: 10, totalPages: 0 });
  const [loading, setLoading] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const params = {
          search: qs.search,
          customerRegion: qs.customerRegion,
          gender: qs.gender,
          ageMin: qs.ageMin,
          ageMax: qs.ageMax,
          productCategory: qs.productCategory,
          tags: qs.tags,
          paymentMethod: qs.paymentMethod,
          dateFrom: qs.dateFrom,
          dateTo: qs.dateTo,
          sort: qs.sort,
          page: qs.page || 1,
          pageSize
        };
        const res = await fetchSales(params);
        setData(res);
      } catch (err) {
        console.error('Error fetching sales', err);
        setData({ results: [], total: 0, page: 1, pageSize, totalPages: 0 });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [qs]);

  if (loading) return <div>Loading...</div>;
  if (!data.results || data.results.length === 0) return <div>No results found.</div>;

  return (
    <div className="transactions-table">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Transaction ID</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Payment</th>
            <th>Employee</th>
          </tr>
        </thead>
        <tbody>
          {data.results.map((r) => (
            <tr key={r._id}>
              <td>{r.date ? new Date(r.date).toLocaleDateString() : '-'}</td>
              <td>{r.transactionId}</td>
              <td>{r.customerName}</td>
              <td>{r.phoneNumber}</td>
              <td>{r.gender}</td>
              <td>{r.age ?? '-'}</td>
              <td>{r.productName}</td>
              <td>{r.productCategory}</td>
              <td>{r.quantity}</td>
              <td>{r.finalAmount ?? r.totalAmount}</td>
              <td>{r.paymentMethod}</td>
              <td>{r.employeeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-meta">
        Showing page {data.page} of {data.totalPages} — {data.total} results
      </div>
    </div>
  );
}
