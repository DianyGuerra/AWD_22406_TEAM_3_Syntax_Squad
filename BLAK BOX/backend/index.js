const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api', orderRoutes);

const orderProductRoutes = require('./routes/orderProductRoutes');
app.use('/api', orderProductRoutes);

const cartRoutes = require('./routes/cartRoutes');
app.use('/api', cartRoutes);

const cartProductRoutes = require('./routes/cartProductRoutes');
app.use('/api', cartProductRoutes);

const wishlistRoutes = require('./routes/wishlistRoutes');
app.use('/api', wishlistRoutes);

const wishlistProductRoutes = require('./routes/wishlistProductRoutes');
app.use('/api', wishlistProductRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes);

const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api', categoryRoutes);

const inventoryRoutes = require('./routes/inventoryRoutes');
app.use('/api', inventoryRoutes);

const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api', paymentRoutes);

const shippingRoutes = require('./routes/shippingRoutes');
app.use('/api', shippingRoutes);

const brandRoutes = require('./routes/brandRoutes');
app.use('/api', brandRoutes);

const notificationsRoutes = require('./routes/notificationsRoutes');
app.use('/api', notificationsRoutes);

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
