const axios = require('axios');

// Function to extract the auth_token from the login response
async function extractAuthToken(email, password) {
    try {
      // Make a POST request to login
      const loginResponse = await axios.post('http://localhost:3000/api/v1/auth/login', {
        email,
        password,
      });
  
      if (loginResponse.status === 200) {
        // Extract the auth_token from the response headers
        const authCookie = loginResponse.headers['set-cookie'];
        const authMatch = /auth_token=(.*?)(;|$)/.exec(authCookie);
        return authMatch ? authMatch[1] : null;
      } else {
        console.error(`Error logging in as ${email}:`, loginResponse.statusText);
        return null;
      }
    } catch (error) {
      // Extract request and response data from the error object
      const requestData = error.config;
      const response = error.response;
  
      if (response) {
        throw {
          message: 'Request failed with response data',
          requestData,
          response: {
            status: response.status,
            data: response.data,
          },
        };
      } else {
        throw {
          message: 'Request failed without a response',
          requestData,
        };
      }
    }
  }

  module.exports = extractAuthToken;
  