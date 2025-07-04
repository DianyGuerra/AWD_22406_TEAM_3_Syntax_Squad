const Inventory = require('../models/inventory');

const getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find()
      .populate('productId', 'name brand price'); // mostrar detalles útiles del producto
    res.status(200).json(inventory);
  } catch (error) {
    console.error("Error getting inventory:", error);
    res.status(500).json({ message: "Server error while getting inventory." });
  }
};


const getInventorySummary = async (req, res) => {
  try {
    const summary = {
      totalProducts: 120,
      outOfStock: 8,
      categories: 10,
    };

    res.status(200).json(summary);
  } catch (error) {
    console.error("Error fetching inventory summary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  getAllInventory,
  getInventorySummary
};
