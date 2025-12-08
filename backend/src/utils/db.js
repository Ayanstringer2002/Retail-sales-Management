// small helper if you need shared DB utils in future
const mongoose = require('mongoose');

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

module.exports = {
  isValidDate
};
