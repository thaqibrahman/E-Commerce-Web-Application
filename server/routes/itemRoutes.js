const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Place bid
router.post('/bid', async (req, res) => {
    try {
        const { itemId, bidAmount, username } = req.body;
        const item = await Item.findById(itemId);
        
        if (!item) return res.status(404).json({ message: 'Item not found' });
        
        if (bidAmount <= item.currentBid) {
            return res.status(400).json({ message: 'Bid must be higher than current bid' });
        }
        
        item.currentBid = bidAmount;
        item.highestBidder = username;
        await item.save();
        
        res.json({ message: 'Bid placed successfully', item });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
