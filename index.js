// server.js
require('dotenv').config();
const express = require('express');
const { JsonRpcProvider, Wallet, Contract } = require('ethers');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Load environment variables
const RPC_URL = process.env.FOUNDRY_RPC_URL;
const PRIVATE_KEY = process.env.FOUNDRY_PRIVATE_KEY;
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;
const PORT = process.env.PORT || 3000;

// ABI - minimal example, adjust to your contract
const nftAbi = [
    "function mintTo(address to, string memory uri) public returns (uint256)",
    "function tokenURI(uint256 tokenId) view returns (string)"
];

// Blockchain setup
const provider = new JsonRpcProvider(RPC_URL);
const wallet = new Wallet(PRIVATE_KEY, provider);

// Routes
app.post('/mint', async (req, res) => {
  const { to, uri, contractAddress } = req.body;
  if (!to || !uri || !contractAddress) return res.status(400).json({ error: 'Missing to, uri, or contractAddress' });

  try {
    const nftContract = new Contract(contractAddress, nftAbi, wallet);
    const tx = await nftContract.mintTo(to, uri);
    const receipt = await tx.wait();
    res.json({ txHash: receipt.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/token-uri/:contractAddress/:tokenId', async (req, res) => {
  const { contractAddress, tokenId } = req.params;
  if (!contractAddress || !tokenId) return res.status(400).json({ error: 'Missing contractAddress or tokenId' });

  try {
    const nftContract = new Contract(contractAddress, nftAbi, wallet);
    const uri = await nftContract.tokenURI(tokenId);
    res.json({ tokenId, uri });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => console.log(`NFT API listening on port ${PORT}`));