const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/auctionDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
        
        // Seed initial data
        const Item = require('../models/Item');
        const count = await Item.countDocuments();
        if (count === 0) {
            await Item.insertMany([
                { title: 'Vintage Rolex', description: 'Rare 1960s watch', startingPrice: 5000, currentBid: 5000 },
                { title: 'Signed Baseball', description: 'Babe Ruth signed ball', startingPrice: 1000, currentBid: 1000 },
                { title: 'MacBook Pro M2', description: 'Mint condition laptop', startingPrice: 1200, currentBid: 1200 }
            ]);
            console.log('Sample items seeded');
        }
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
