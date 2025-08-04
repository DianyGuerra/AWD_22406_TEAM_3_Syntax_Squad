// middleware/auth.js
const jwt  = require('jsonwebtoken');
const User = require('../models/user');

exports.protect = async (req, res, next) => {
  let token;
  // 1) Obtener token del header Authorization: "Bearer <token>"
  if (
    req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing.' });
  }

  try {
    // 2) Verificar y decodificar
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 3) Adjuntar usuario a req (sin password)
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid.' });
  }
};

exports.admin = (req, res, next) => {
  if (!req.user || req.user.userType !== 'admin') {
    return res.status(403).json({ message: 'Admin access only.' });
  }
  next();
};

exports.isSelf = (req, res, next) => {
  if (req.user._id.toString() !== req.params.id) {
    return res.status(403).json({ message: 'Forbidden: not your own resource.' });
  }
  next();
};
