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

module.exports = {
  getAllInventory
};
