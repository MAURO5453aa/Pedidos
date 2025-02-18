const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pendiente', 'enviado', 'entregado'], default: 'pendiente' }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
