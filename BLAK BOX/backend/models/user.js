const mongoose  = require('mongoose');
const bcrypt    = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName:   { type: String, required: true, trim: true, minlength: 3 },
  lastName:    { type: String, required: true, trim: true, minlength: 2 },
  email:       { type: String, required: true, unique: true, lowercase: true,
                 trim: true, match: [/.+\@.+\..+/, 'Invalid email'] },
  password:    { type: String, required: true, minlength: 6 },
  userType:    { type: String, enum: ['customer','admin'], default: 'customer' },
  phoneNumber: { type: String, match: [/^\+?[0-9]{7,14}$/, 'Invalid phone'] },
}, { collection: 'user' });

// 🔐 Hash password before save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔍 Compare plain-text password to hash
userSchema.methods.comparePassword = function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);
