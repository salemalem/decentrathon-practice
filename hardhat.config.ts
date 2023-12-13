import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const ALCHEMY_API_KEY = "WanrXfqYK1qRoalmkosBMCjwDmpko8BN";
const SEPOLIA_PRIVATE_KEY = "2e7b4d07223a4f1243dfca88eebf6c15699fe0ccc9467e72c363967a68e9b1f7"

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  etherscan: {
    apiKey: "6HVYMP8SBNKYPFSFC27W9P1T4AEE582KGH",
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};

export default config;
