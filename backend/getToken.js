const axios = require('axios');

const loginAdmin = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/login', {
      email: 'admin@example.com',
      password: 'admin123'
    });

    console.log('Admin token:', response.data.token);
  } catch (error) {
    console.error('Error logging in:', error.response?.data?.message || error.message);
  }
};

loginAdmin();
