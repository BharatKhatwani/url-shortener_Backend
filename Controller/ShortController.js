const express = require('express');
const shortid = require('shortid');
const Url = require('../model/Link_Schema'); // Change path if needed

const createShortId = async (req, res) => {
    const { longUrl } = req.body;

    if (!longUrl) {
        return res.status(400).json({ error: 'longUrl is required' });
    }

    const shortId = shortid.generate();
    const shortUrl = `http://localhost:3000/${shortId}`;

    // You might want to save the URL mapping to DB here:
    await Url.create({ longUrl, shortId });

    res.status(201).json({
        longUrl,
        shortId,
        shortUrl
    });
};

const sendRequest = async (req, res) => {
    const { shortId } = req.params; 
    if (!shortId) {
        return res.status(400).json({ error: 'shortId is required' });
    }
    try {
        const url = await Url.findOne({ shortId: shortId });
        if (!url) {
            return res.status(404).json({ error: 'Url not found' });
        }
        res.redirect(url.longUrl);
    } catch (error) {
        console.error("Error in sendRequest:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { createShortId, sendRequest };
