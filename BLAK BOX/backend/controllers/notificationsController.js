const User = require('../models/user');
const Order = require('../models/order');
const Product = require('../models/product');
const Wishlist = require('../models/wishlist');
const WishlistProduct = require('../models/wishlistProduct');

const sendWhatsAppNotification = async (req, res) => {
  const { orderId, userId, phoneNumber, message } = req.body;

  if (!orderId || !userId || !phoneNumber || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findById(userId);
    const order = await Order.findById(orderId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    const phoneRegex = /^\+?[0-9]{7,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ message: "Invalid phone number format." });
    }

    console.log(`📤 WhatsApp message sent to ${phoneNumber}:\n${message}`);

    res.status(200).json({ message: "WhatsApp notification sent successfully" });

  } catch (error) {
    console.error("Error sending WhatsApp notification:", error);
    res.status(500).json({ message: "Server error while sending WhatsApp notification." });
  }
};


const notifyAvailability = async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required." });
  }

  try {
    const product = await Product.findById(productId);
    if (!product || product.stock <= 0) {
      return res.status(400).json({ message: "Product not found or still out of stock." });
    }

    const wishlistProducts = await WishlistProduct.find({ productId });

    if (wishlistProducts.length === 0) {
      return res.status(200).json({ message: "No wishlists contain this product." });
    }

    const wishlistIds = wishlistProducts.map(wp => wp.wishlistId);
    const wishlists = await Wishlist.find({ _id: { $in: wishlistIds } });

    const userIds = [...new Set(wishlists.map(w => w.userId.toString()))];
    const users = await User.find({ _id: { $in: userIds } });


    console.log("✅ WishlistProducts:", wishlistProducts);
    console.log("✅ Wishlist IDs:", wishlistIds);
    console.log("✅ Wishlists encontradas:", wishlists);
    console.log("✅ User IDs únicos:", userIds);
    console.log("✅ Usuarios encontrados:", users);

    users.forEach(user => {
      const contact = user.phoneNumber || user.email;
      const name = `${user.firstName} ${user.lastName}`;
      console.log(`📢 Notificando a ${name} (${contact}): El producto "${product.name}" ya está disponible.`);
    });

    res.status(200).json({ message: "Users notified about product availability" });

  } catch (error) {
    console.error("Error notifying users:", error);
    res.status(500).json({ message: "Server error while notifying users." });
  }
};

module.exports = {
  sendWhatsAppNotification,
  notifyAvailability
};
