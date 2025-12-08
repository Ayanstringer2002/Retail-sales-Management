const salesService = require('../services/salesService');

async function getSales(req, res, next) {
  try {
    // Accept arrays both as repeated qs and comma-separated values
    // Express query parser by default handles repeated keys as array
    const q = { ...req.query };

    const data = await salesService.querySales(q);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = { getSales };
