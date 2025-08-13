const { recompileSchema } = require('../models/payment');
const Product = require('../models/product');
const mongoose = require('mongoose');


//------------------------------------------------------------------------PRODUCT operations-----------------------------------------------------

//GET: get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('categoryId', 'categoryName');
      res.status(200).json(products);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ message: "Server error while getting products." });
  }
};

//POST: Create a new product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      price,
      stock,
      categoryId,
      discount,
      features,
      sales,
      imageUrl
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      brand,
      price,
      stock,
      categoryId,
      discount,
      features,
      sales,
      imageUrl
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });

  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: 'Server error while creating product' });
  }
};




//PUT:  Update an existing product
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    const updated = await Product.findByIdAndUpdate(productId, updateData, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: `Product '${updated.name}' updated successfully.`,
      product: updated
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};


//DELETE:  Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const deleted = await Product.findByIdAndDelete(productId);

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).send({message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

//-----------------------------------------------------------------------SERVICES operations for products-----------------------------------------------------

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId)
      .populate('categoryId', 'categoryName categoryDescription')
      .lean();

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { categoryId, _id, ...rest } = product;
    const result = {
      ...rest,
      id: _id,
      category: categoryId
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Get products by price range
const getProductsByPriceRange = async (req, res) => {
    try {
        const minPrice = parseFloat(req.params.min);
        const maxPrice = parseFloat(req.params.max);
        const products = await Product.find({ price: { $gte: minPrice, $lte: maxPrice } });
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found in this price range." });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error("Error getting products by price range:", error);
        res.status(500).json({ message: "Server error while getting products by price range." });
    }
};

// Get products with low stock
const getLowStockProducts = async (req, res) => {
  try {
    const threshold = 5;

    const lowStockProducts = await Product.find({ stock: { $lte: threshold } })
      .select('name stock');

    res.status(200).json(lowStockProducts);

  } catch (error) {
    console.error("Error getting low stock products:", error);
    res.status(500).json({ message: "Server error while fetching low stock products." });
  }
};


// Search products by keyword
const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.query;
    const regex = new RegExp(keyword, 'i'); // case-insensitive

    const results = await Product.find({
      $or: [{ name: regex }, { description: regex }]
    }).select('name');

    const formatted = results.map(p => ({ id: p._id, name: p.name }));
    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Error searching products' });
  }
};

const getTopSellingProducts = async (req, res) => {
  try {
    const topProducts = await Product.find()
      .sort({ sales: -1 })
      .limit(10)
      .select('name sales');

    const formatted = topProducts.map(p => ({
      id: p._id,
      name: p.name,
      sales: p.sales
    }));

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving top-selling products' });
  }
};


// Update product stock
const updateProductStock = async (req, res) => {
  try {
    const { productId } = req.params;
    const { stock } = req.body;

    const updated = await Product.findByIdAndUpdate(productId, { stock }, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).send({message: 'Stock updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating stock' });
  }
};


// Get products with discounts
const getDiscountedProducts = async (req, res) => {
  try {
    const products = await Product.find({ discount: { $ne: "0%" } }).select('name discount');
    const result = products.map(p => ({
      id: p._id,
      name: p.name,
      discount: p.discount
    }));
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving discounted products' });
  }
};

// Recomend similar products
const getSimilarProducts = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const similarProducts = await Product.find({
      _id: { $ne: productId },
      category: product.category,
      brand: product.brand
    }).limit(5);

    res.status(200).json(similarProducts);

  } catch (error) {
    res.status(500).json({ message: "Error getting similar products" });
  }
};

const submitProductRating = async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return res.status(400).json({ message: "Rating and comment are required." });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5." });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    product.ratings.push({ rating, comment });
    await product.save();

    res.status(201).json({ message: "Review submitted" });
  } catch (err) {
    console.error("Error submitting review:", err);
    res.status(500).json({ message: "Server error while submitting review." });
  }
};

const getAverageProductRating = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const ratings = product.ratings;

    if (ratings.length === 0) {
      return res.status(200).json({ averageRating: 0 });
    }

    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    const average = (sum / ratings.length).toFixed(1); // redondeo a 1 decimal

    res.status(200).json({ averageRating: parseFloat(average) });
  } catch (error) {
    console.error("Error calculating average rating:", error);
    res.status(500).json({ message: "Server error while calculating average rating." });
  }
};

const compareProductsById = async (req, res) => {
  try {
    const { productId1, productId2 } = req.params;

    // Validar IDs
    if (!mongoose.Types.ObjectId.isValid(productId1) || !mongoose.Types.ObjectId.isValid(productId2)) {
      return res.status(400).json({ error: "Invalid product ID(s)" });
    }

    // Buscar productos
    const products = await Product.find({ _id: { $in: [productId1, productId2] } })
      .select('name features price')
      .lean();

    if (products.length !== 2) {
      return res.status(404).json({ error: "One or both products not found" });
    }

    const formatted = products.map(p => ({
      id: p._id,
      name: p.name,
      features: p.features,
      price: p.price
    }));

    // Determinar cuál es más barato
    let cheaperMessage = '';
    if (formatted[0].price < formatted[1].price) {
      cheaperMessage = `${formatted[0].name} is cheaper than ${formatted[1].name}`;
    } else if (formatted[0].price > formatted[1].price) {
      cheaperMessage = `${formatted[1].name} is cheaper than ${formatted[0].name}`;
    } else {
      cheaperMessage = `Both products have the same price`;
    }

    res.status(200).json({
      products: formatted,
      comparison: cheaperMessage
    });
  } catch (error) {
    console.error("Error comparing products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  searchProducts,
  getTopSellingProducts,
  getLowStockProducts,
  updateProductStock,
  getProductsByPriceRange,
  deleteProduct,
  getDiscountedProducts,
  getSimilarProducts,
  submitProductRating,
  getAverageProductRating,
  compareProductsById
};

