require('dotenv').config();
const express = require('express');
const { ethers } = require('ethers');
const abi = require('./abi/NFTMusa.json').abi;

const app = express();
app.use(express.json());

const provider = new ethers.JsonRpcProvider(process.env.AMOY_RPC);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

// Mint NFT
app.post('/mint', async (req, res) => {
    const { to, uri } = req.body;
    try {
        const tx = await contract.safeMint(to, uri);
        const receipt = await tx.wait();
        const event = receipt.logs.find(log => log.fragment?.name === 'Transfer');
        const tokenId = event?.args?.tokenId.toString();
        res.json({ success: true, tokenId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get token URI
app.get('/token/:id', async (req, res) => {
    try {
        const uri = await contract.tokenURI(req.params.id);
        res.json({ tokenId: req.params.id, uri });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Burn NFT
app.delete('/burn/:id', async (req, res) => {
    try {
        const tx = await contract.burn(req.params.id);
        await tx.wait();
        res.json({ success: true, tokenId: req.params.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log('API server running on http://localhost:3000');
});