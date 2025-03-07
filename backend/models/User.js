const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{10}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  passcode: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 6
  },
  passphrase: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length === 12;
      },
      message: 'Passphrase must contain exactly 12 words.'
    }
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.passcode = await bcrypt.hash(this.passcode, salt);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.comparePasscode = async function (enteredPasscode) {
  return await bcrypt.compare(enteredPasscode, this.passcode);
};

module.exports = mongoose.model('User', userSchema);
