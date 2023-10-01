// app/controllers/userController.js
const User = require('../models/User');

exports.setUserAddressInfo = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      address1,
      address2,
      country,
      state,
      city,
      postalCode,
      phoneNumber,
    } = req.body;

    // Assuming you have user information available in req.user after authentication
    const userId = req.user.id;

    // Update the user's information, including address and personal details
    const [rowsAffected] = await User.update(
      {
        firstName,
        lastName,
        address1,
        address2,
        country,
        state,
        city,
        postalCode,
        phoneNumber,
      },
      { where: { id: userId } }
    );

    if (rowsAffected > 0) {
      return res.json({ message: 'Information updated successfully' });
    } else {
      return res.status(404).json({ error: 'User not found or no changes were made' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user information' });
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
