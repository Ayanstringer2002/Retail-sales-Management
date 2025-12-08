// seeds database from CSV located at /mnt/data/truestate_assignment_dataset.csv
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const Sale = require('../src/models/Sale');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/truestate_sales';
const CSV_PATH = path.resolve('/mnt/data/truestate_assignment_dataset.csv'); // adjust if needed

async function main() {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB for seeding');

  // remove existing
  await Sale.deleteMany({});
  const items = [];

  fs.createReadStream(CSV_PATH)
    .pipe(csv())
    .on('data', (row) => {
      // map CSV columns to Sale model fields; adapt keys if your CSV has different headers
      const sale = {
        transactionId: row.TransactionID || row.transactionId || row.Transaction_Id || '',
        date: row.Date ? new Date(row.Date) : null,
        customerId: row.CustomerID || row.Customer_ID || '',
        customerName: row.CustomerName || row.Customer_Name || '',
        phoneNumber: row.PhoneNumber || row.Phone || '',
        gender: row.Gender || '',
        age: parseInt(row.Age || '0', 10) || null,
        customerRegion: row.CustomerRegion || row.Region || '',
        customerType: row.CustomerType || '',

        productId: row.ProductID || row.Product_ID || '',
        productName: row.ProductName || '',
        brand: row.Brand || '',
        productCategory: row.ProductCategory || row.Category || '',
        tags: row.Tags ? row.Tags.split('|').map(t => t.trim()) : [],

        quantity: parseInt(row.Quantity || '0', 10) || 0,
        pricePerUnit: parseFloat(row.PricePerUnit || row.Price || '0') || 0,
        discountPercentage: parseFloat(row.DiscountPercentage || '0') || 0,
        totalAmount: parseFloat(row.TotalAmount || '0') || 0,
        finalAmount: parseFloat(row.FinalAmount || '0') || 0,

        paymentMethod: row.PaymentMethod || '',
        orderStatus: row.OrderStatus || '',
        deliveryType: row.DeliveryType || '',
        storeId: row.StoreID || '',
        storeLocation: row.StoreLocation || '',
        salespersonId: row.SalespersonID || '',
        employeeName: row.EmployeeName || ''
      };
      items.push(sale);
    })
    .on('end', async () => {
      console.log(`Parsed ${items.length} rows`);
      try {
        await Sale.insertMany(items);
        console.log('Seed complete');
      } catch (err) {
        console.error('Seed error', err);
      } finally {
        mongoose.disconnect();
      }
    });
}

main().catch(console.error);
