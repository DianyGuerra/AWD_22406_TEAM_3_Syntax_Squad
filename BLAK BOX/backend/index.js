const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/blakbox', userRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/blakbox', orderRoutes);

const orderProductRoutes = require('./routes/orderProductRoutes');
app.use('/blakbox', orderProductRoutes);

const cartRoutes = require('./routes/cartRoutes');
app.use('/blakbox', cartRoutes);

const cartProductRoutes = require('./routes/cartProductRoutes');
app.use('/blakbox', cartProductRoutes);

const wishlistRoutes = require('./routes/wishlistRoutes');
app.use('/blakbox', wishlistRoutes);

const wishlistProductRoutes = require('./routes/wishlistProductRoutes');
app.use('/blakbox', wishlistProductRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/blakbox', productRoutes);

const categoryRoutes = require('./routes/categoryRoutes');
app.use('/blakbox', categoryRoutes);

const inventoryRoutes = require('./routes/inventoryRoutes');
app.use('/blakbox', inventoryRoutes);

const paymentRoutes = require('./routes/paymentRoutes');
app.use('/blakbox', paymentRoutes);

const shippingRoutes = require('./routes/shippingRoutes');
app.use('/blakbox', shippingRoutes);

const brandRoutes = require('./routes/brandRoutes');
app.use('/blakbox', brandRoutes);

const notificationsRoutes = require('./routes/notificationsRoutes');
app.use('/blakbox', notificationsRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(3007, () => {
    console.log('🚀 Server running on http://localhost:3007');
  });
})
.catch(err => console.error('❌ Connection error:', err));
