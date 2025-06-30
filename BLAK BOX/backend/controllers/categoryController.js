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

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ categoryName: name });
    await category.save();
    res.status(201).json({ message: 'Category created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating category' });
  }
};


const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updated = await Category.findByIdAndUpdate(id, { categoryName: name });

    if (!updated) return res.status(404).json({ message: 'Category not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error updating category' });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory
};


