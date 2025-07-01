const Brand = require('../models/brand');

const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find().select('name -_id');
    const brandNames = brands.map(brand => brand.name);
    res.status(200).json(brandNames);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving brands' });
  }
};

const createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const newBrand = new Brand({ name });
    await newBrand.save();
    res.status(201).json({ message: 'Brand added' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating brand' });
  }
};

module.exports = {
  getAllBrands,
  createBrand
};
