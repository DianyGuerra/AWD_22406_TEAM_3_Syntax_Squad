const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(
  cors({
    origin: '*',    // ← cualquier dominio
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization']
  })
);


app.use(express.json());

const userRoutes              = require('./routes/userRoutes');
const orderRoutes             = require('./routes/orderRoutes');
const orderProductRoutes      = require('./routes/orderProductRoutes');
const cartRoutes              = require('./routes/cartRoutes');
const cartProductRoutes       = require('./routes/cartProductRoutes');
const wishlistRoutes          = require('./routes/wishlistRoutes');
const wishlistProductRoutes   = require('./routes/wishlistProductRoutes');
const productRoutes           = require('./routes/productRoutes');
const categoryRoutes          = require('./routes/categoryRoutes');
const inventoryRoutes         = require('./routes/inventoryRoutes');
const paymentRoutes           = require('./routes/paymentRoutes');
const shippingRoutes          = require('./routes/shippingRoutes');
const brandRoutes             = require('./routes/brandRoutes');
const notificationsRoutes     = require('./routes/notificationsRoutes');

app.use('/blakbox', userRoutes);
app.use('/blakbox', orderRoutes);
app.use('/blakbox', orderProductRoutes);
app.use('/blakbox', cartRoutes);
app.use('/blakbox', cartProductRoutes);
app.use('/blakbox', wishlistRoutes);
app.use('/blakbox', wishlistProductRoutes);
app.use('/blakbox', productRoutes);
app.use('/blakbox', categoryRoutes);
app.use('/blakbox', inventoryRoutes);
app.use('/blakbox', paymentRoutes);
app.use('/blakbox', shippingRoutes);
app.use('/blakbox', brandRoutes);
app.use('/blakbox', notificationsRoutes);

const PORT = process.env.PORT || 3007;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    app.listen(PORT);
  })
  .catch(err => console.error('❌ Connection error:', err));
