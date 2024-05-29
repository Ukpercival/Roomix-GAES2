const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService {
  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async getUserById(userId) {
    return await User.findById(userId);
  }

  async updateUser(userId, userData) {
    return await User.findByIdAndUpdate(userId, userData, { new: true });
  }

  async deleteUser(userId) {
    return await User.findByIdAndDelete(userId);
  }

  async getAllUsers() {
    return await User.find();
  }

  async loginUser(email, password) {
    const user = await User.findOne({ correo: email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.contrasena);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { user, token };
  }
}

module.exports = new UserService();
