const User = require('../models/user');

//-----------------------------------------------CRUD operations for users

//GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: "Server error while getting users." });
  }
};


//POST create a new user
const createNewUser = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber} = req.body;
  try {
    const newUser = new User({ firstName, lastName, email, password, phoneNumber});
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error while creating user." });
  }
};

//PUT update user by ID
const updateUserById = async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { firstName, lastName, email, password, phoneNumber }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error while updating user." });
  }
};

//DELETE user by ID
const deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error while deleting user." });
  }
};


// ----------------------------------------SERVICES operations for users


//GET user by ID
const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId); 
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "Server error while getting user." });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Actualizar última fecha de login
    user.lastLogin = new Date();
    await user.save();

    // Generar el token JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        userType: user.userType
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    return res.status(200).json({ token });

  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};


module.exports = {
  getAllUsers,
  createNewUser,
  updateUserById,
  deleteUserById,
  getUserById
};
