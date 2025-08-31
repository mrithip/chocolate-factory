const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const products = [
  {
    name: 'Dark Chocolate Truffles',
    description: 'Rich dark chocolate with a smooth creamy center, dusted with cocoa powder.',
    price: 15.99,
    stock: 50,
    image: '/uploads/snackchocolate.png',
    category: 'Dark Chocolate',
    ingredients: ['Cocoa Mass', 'Sugar', 'Cocoa Butter', 'Cream', 'Cocoa Powder'],
    weight: 150,
    rating: 4.8,
    reviewCount: 124
  },
  {
    name: 'Milk Chocolate Hazelnut Bar',
    description: 'Creamy milk chocolate bar generously filled with crunchy roasted hazelnuts.',
    price: 12.99,
    stock: 75,
    image: '/uploads/milkandchoco.png',
    category: 'Milk Chocolate',
    ingredients: ['Milk Chocolate', 'Hazelnuts', 'Sugar', 'Cocoa Butter', 'Milk Solids'],
    weight: 180,
    rating: 4.6,
    reviewCount: 98
  },
  {
    name: 'White Chocolate Raspberry Delight',
    description: 'Sweet white chocolate infused with tangy raspberry pieces, a delightful contrast.',
    price: 14.50,
    stock: 40,
    image: '/uploads/strawberrychocolate.png',
    category: 'White Chocolate',
    ingredients: ['White Chocolate', 'Raspberry', 'Sugar', 'Milk Solids', 'Vanilla'],
    weight: 160,
    rating: 4.7,
    reviewCount: 87
  },
  {
    name: 'Assorted Chocolate Gift Box',
    description: 'A luxurious selection of our finest chocolates, perfect for gifting.',
    price: 24.99,
    stock: 30,
    image: '/uploads/brownchocolate.png',
    category: 'Gift Boxes',
    ingredients: ['Assorted Chocolates'],
    weight: 300,
    rating: 4.9,
    reviewCount: 150
  },
  {
    name: 'Spicy Chili Dark Chocolate',
    description: 'An adventurous blend of dark chocolate with a hint of fiery chili.',
    price: 13.50,
    stock: 25,
    image: '/uploads/chocolatebar.png',
    category: 'Dark Chocolate',
    ingredients: ['Cocoa Mass', 'Sugar', 'Chili Powder', 'Cocoa Butter'],
    weight: 100,
    rating: 4.2,
    reviewCount: 60
  }
];

const uploadProducts = async () => {
  const adminToken = process.env.ADMIN_TOKEN; // Ensure you set this in your .env for the script

  if (!adminToken) {
    console.error('ADMIN_TOKEN not found in .env. Please set it to an admin user\'s JWT token.');
    return;
  }

  try {
    console.log('Connecting to backend to upload products...');
    for (const product of products) {
      await axios.post('http://localhost:5000/api/products', product, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        }
      });
      console.log(`Product "${product.name}" uploaded successfully.`);
    }
    console.log('All products uploaded!');
  } catch (error) {
    console.error('Error uploading products:', error.response?.data?.message || error.message);
  }
};

uploadProducts();
