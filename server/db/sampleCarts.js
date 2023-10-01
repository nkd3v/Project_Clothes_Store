const axios = require('axios');
const extractAuthToken = require('./extractAuthToken');

// Function to create a sample cart for a user
async function createSampleCartForUser(username, password) {
  try {
    // Extract the auth_token using the extractAuthToken function
    const auth_token = await extractAuthToken(username, password);

    if (auth_token) {
      // Use the captured auth_token in the subsequent request
      const cartResponse = await axios.post('http://localhost:3000/api/v1/carts/add', {
        productVariantId: 1,
        quantity: Math.floor(Math.random() * 101),
      }, {
        headers: {
          Cookie: `auth_token=${auth_token}`,
        },
      });

      if (cartResponse.status === 201) {
        console.log(`Sample cart created successfully for ${username}!`);
      } else {
        console.error(`Error creating sample cart for ${username}:`, cartResponse.statusText);
      }
    } else {
      console.error(`Error extracting auth_token for ${username}.`);
    }
  } catch (error) {
    console.error(`Error creating sample cart for ${username}:`, error.response.data);
  }
}

module.exports = createSampleCartForUser;
