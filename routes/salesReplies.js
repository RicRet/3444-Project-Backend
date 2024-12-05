const express = require('express');
const {insertSalesReply, getSalesReplies} = require('../models/salesReplies');

const Router = express.Router();

router.post('/', async (req, res) => {
    const {heading, content, ownerId, imageUrl} = req.body;
    try{
        const newEventPost = await insertSalesReply(parentID, content,ownerId);
        res.status(201).json(newEventPost);
    }catch (error) {
        console.error('Error inserting sales reply:', error);
        res.status(500).json({message:'Error insertign the sales replies'});
    }
});

router.get('/recent', async (req,res) => {
    const {limit } = req.query;
    try{
        const posts = await getReplies(limit);
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json({message: 'Error fetching recent posts;'});
    }
});


