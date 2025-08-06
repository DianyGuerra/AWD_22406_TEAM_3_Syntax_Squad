const express   = require('express');
const passport  = require('passport');
const jwt       = require('jsonwebtoken');
const router    = express.Router();

/**
 *    GET /blakbox/auth/google
 */
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/**
 *    GET /blakbox/auth/google/callback
 */
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const payload = { id: req.user._id, userType: req.user.userType };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );


    const frontUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        return res.redirect(
        `${frontUrl}/auth-success?token=${encodeURIComponent(token)}`
    );
  }
);

module.exports = router;
