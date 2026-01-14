const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const watchImages = [
    'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1612817159949-19533cb267e2?auto=format&fit=crop&w=800&q=80',
];

const updateImages = async () => {
    await connectDB();

    try {
        const products = await Product.find({});

        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const randomImage = watchImages[i % watchImages.length];

            product.image = randomImage;
            await product.save();
            console.log(`Updated image for: ${product.name}`);
        }

        console.log('All product images updated successfully!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

updateImages();
