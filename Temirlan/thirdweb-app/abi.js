export const abi = [
  {
    "inputs": [],
    "name": "decryptMessage",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "encryptedMessage",
        "type": "string"
      }
    ],
    "name": "encryptAndStoreMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
