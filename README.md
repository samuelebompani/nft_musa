# NFT Musa
![tests](https://github.com/samuelebompani/nft_musa/actions/workflows/test.yml/badge.svg)

A project to deploy and interact with custom ERC721 NFTs via smart contracts and an Express.js API server.

## Requirements

- Node.js ≥ 18
- npm
- Foundry (for compiling/deploying contracts)
- An Ethereum RPC endpoint (e.g. Alchemy, Infura)
- A funded private key for interacting with smart contracts

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/samuelebompani/nft_musa.git
cd nft_musa
```
### 2. Install dependencies
```bash
npm install
```
### 3. Create ```.env``` file
```
RPC_URL=https://your_rpc_url
PRIVATE_KEY=your_wallet_private_key
PORT=3000
```
⚠️ Never commit .env to version control.

## API Server
The ```index.js``` file creates an Express server to interact with the deployed NFT contracts via HTTP.
### Run it
```
node index.js
```
### Available endpoints:
```POST /mint```

Mint a new NFT to a given address.

**Request body:**

```json
{
  "to": "0xRecipientAddress",
  "uri": "ipfs://metadataURI",
  "contractAddress": "0xYourContractAddress"
}
```

**Response:**

```json
{
  "txHash": "0xTransactionHash"
}
```
```GET /token-uri/:contractAddress/:tokenId```

Fetch the ```tokenURI``` of a specific NFT.

**Response:**
```json
{
  "tokenId": "0",
  "uri": "ipfs://metadataURI"
}
```

## Tests
### Api
Run the Jest tests for the API server:
```bash
npm run test-api
```
You can edit ```test/api.test.js``` to include real or mocked contract addresses.

### Smart contracts
Run the tests for the Smart Contracts:
```bash
npm test
```