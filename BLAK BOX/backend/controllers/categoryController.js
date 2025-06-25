const Category = require('../models/category');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error getting categories:", error);
    res.status(500).json({ message: "Server error while getting categories." });
  }
};

module.exports = {
  getAllCategories
};
