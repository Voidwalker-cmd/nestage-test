require("@nomiclabs/hardhat-ethers");
//require("@thirdweb-dev/hardhat");
// require("@thirdweb-dev/contracts");
require("dotenv").config();

// const { task } = require("hardhat/config");

// Replace with your BNB Chain node URLs
const MAINNET_RPC_URL = "https://bsc-dataseed.binance.org/";
const TESTNET_RPC_URL = "https://data-seed-prebsc-1-s1.binance.org:8545/";
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY || PRIVATE_KEY.length !== 64) {
  throw new Error(
    "Please set your PRIVATE_KEY in a .env file with a valid 64-character hexadecimal private key."
  );
}

module.exports = {
  defaultNetwork: "bscTestnet",
  networks: {
    hardhat: {},
    bsc: {
      url: MAINNET_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 56,
    },
    bscTestnet: {
      url: TESTNET_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 97,
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
