const request = require('supertest');
const app = require('../index');

// Example valid data - replace with your test contract and addresses
const TEST_CONTRACT_ADDRESS = '0x799b1325291cb86eed4a5d3a1c904b7a62e569d6';
const TEST_TO_ADDRESS = '0x3481015f6157Fdc28942225425CF70EfbCc38616';
const TEST_TOKEN_ID = '0';
const TEST_URI = 'ipfs://testuri';

describe('NFT API', () => {

  describe('POST /mint', () => {
    it('should return 400 if missing parameters', async () => {
      const res = await request(app).post('/mint').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    // NOTE: This test will attempt to actually call blockchain!
    // You might want to mock contract or skip this if you don't have a test environment.
    it.skip('should mint a token and return txHash', async () => {
      const res = await request(app).post('/mint').send({
        to: TEST_TO_ADDRESS,
        uri: TEST_URI,
        contractAddress: TEST_CONTRACT_ADDRESS,
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('txHash');
    });
  });

  describe('GET /token-uri/:contractAddress/:tokenId', () => {
    it('should return 404 if missing params', async () => {
      const res = await request(app).get('/token-uri/');
      expect(res.statusCode).toBe(404);
    });

    // NOTE: This test will actually call the blockchain!
    // You can mock or skip if no testnet setup available.
    it('should return token URI', async () => {
      const res = await request(app).get(`/token-uri/${TEST_CONTRACT_ADDRESS}/${TEST_TOKEN_ID}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('uri');
      expect(res.body.tokenId).toBe(TEST_TOKEN_ID);
    });
  });

});
