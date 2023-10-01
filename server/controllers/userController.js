// app/controllers/userController.js
const User = require('../models/User');

exports.setUserAddressInfo = async (req, res) => {
  try {
    const { address1, address2, country, state, city, postalCode } = req.body;
    
    // Assuming you have user information available in req.user after authentication
    const userId = req.user.id;

    // Update the user's address information
    const updatedUser = await User.update(
      { address1, address2, country, state, city, postalCode },
      { where: { id: userId } }
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user address info' });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    // Assuming you have user information available in req.user after authentication
    const userId = req.user.id;

    // Find the user by their ID
    const user = (await User.findByPk(userId)).toJSON();

    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user info' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
