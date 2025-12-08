const Sale = require('../models/Sale');

/**
 * Build a Mongo query given request query parameters.
 * Supports:
 * - search (text)
 * - multi-select arrays: customerRegion, gender, productCategory, tags, paymentMethod
 * - age range: ageMin, ageMax
 * - date range: dateFrom, dateTo
 */
function buildQuery(q) {
  const {
    search,
    customerRegion,
    gender,
    ageMin,
    ageMax,
    productCategory,
    tags,
    paymentMethod,
    dateFrom,
    dateTo
  } = q;

  const query = {};

  // Full-text search (customerName + phoneNumber) using text index
  if (search && search.trim().length > 0) {
    // Use Mongo text search for relevance and case-insensitive matches
    query.$text = { $search: search };
  }

  // Multi-select fields (expect comma-separated)
  if (customerRegion) {
    const arr = Array.isArray(customerRegion) ? customerRegion : customerRegion.split(',');
    query.customerRegion = { $in: arr.map(s => s.trim()).filter(Boolean) };
  }

  if (gender) {
    const arr = Array.isArray(gender) ? gender : gender.split(',');
    query.gender = { $in: arr.map(s => s.trim()).filter(Boolean) };
  }

  if (productCategory) {
    const arr = Array.isArray(productCategory) ? productCategory : productCategory.split(',');
    query.productCategory = { $in: arr.map(s => s.trim()).filter(Boolean) };
  }

  if (paymentMethod) {
    const arr = Array.isArray(paymentMethod) ? paymentMethod : paymentMethod.split(',');
    query.paymentMethod = { $in: arr.map(s => s.trim()).filter(Boolean) };
  }

  // Tags: need documents that have any of the supplied tags
  if (tags) {
    const arr = Array.isArray(tags) ? tags : tags.split(',');
    query.tags = { $in: arr.map(s => s.trim()).filter(Boolean) };
  }

  // Age range
  const ageQuery = {};
  if (ageMin !== undefined && ageMin !== '') {
    const min = parseInt(ageMin, 10);
    if (!isNaN(min)) ageQuery.$gte = min;
  }
  if (ageMax !== undefined && ageMax !== '') {
    const max = parseInt(ageMax, 10);
    if (!isNaN(max)) ageQuery.$lte = max;
  }
  if (Object.keys(ageQuery).length) query.age = ageQuery;

  // Date range
  if (dateFrom || dateTo) {
    const d = {};
    if (dateFrom) {
      const df = new Date(dateFrom);
      if (!isNaN(df)) d.$gte = df;
    }
    if (dateTo) {
      const dt = new Date(dateTo);
      if (!isNaN(dt)) d.$lte = dt;
    }
    if (Object.keys(d).length) query.date = d;
  }

  return query;
}

async function querySales(q) {
  const page = Math.max(parseInt(q.page || 1, 10), 1);
  const pageSize = Math.max(parseInt(q.pageSize || 10, 10), 1);
  const skip = (page - 1) * pageSize;

  const sortParam = q.sort || 'date_desc'; // default newest first
  let sort = { date: -1 }; // default

  if (sortParam === 'date_desc') sort = { date: -1 };
  if (sortParam === 'date_asc') sort = { date: 1 };
  if (sortParam === 'quantity_desc') sort = { quantity: -1 };
  if (sortParam === 'quantity_asc') sort = { quantity: 1 };
  if (sortParam === 'customer_asc') sort = { customerName: 1 };
  if (sortParam === 'customer_desc') sort = { customerName: -1 };

  const query = buildQuery(q);

  // If $text used, include score if needed for relevance sorting
  let cursor = Sale.find(query).sort(sort).skip(skip).limit(pageSize);

  let total = await Sale.countDocuments(query);
  const results = await cursor.exec();

  return {
    results,
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize)
  };
}

module.exports = { querySales };
