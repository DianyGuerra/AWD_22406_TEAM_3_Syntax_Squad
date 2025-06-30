const Product = require('../models/product');

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
    const { name, price, category, stock } = req.body;

    const newProduct = new Product({
      name,
      price,
      stock,
      brand: "--", 
      description: "--",
      categoryId: category, 
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully' });

  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: 'Server error while creating product' });
  }
};


//PUT:  Update an existing product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Producto not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

//DELETE:  Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Producto not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

//-----------------------------------------------------------------------SERVICES operations for products-----------------------------------------------------

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate('categoryId', 'categoryName');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      id: product._id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
      brand: product.brand,
      category: product.categoryId,
    });

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


// Filter products by price range
const filterProductsByPrice = async (req, res) => {
  try {
    const { minPrice = 0, maxPrice = Infinity } = req.query;

    const results = await Product.find({
      price: { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) }
    }).select('name price');

    const formatted = results.map(p => ({
      id: p._id,
      name: p.name,
      price: p.price
    }));

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Error filtering products by price' });
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
    const { id } = req.params;
    const { stock } = req.body;

    const updated = await Product.findByIdAndUpdate(id, { stock }, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(204).send(); // No content
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


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  searchProducts,
  filterProductsByPrice,
  getTopSellingProducts,
  getLowStockProducts,
  updateProductStock,
  getProductsByPriceRange,
  deleteProduct,
  getDiscountedProducts,
};

