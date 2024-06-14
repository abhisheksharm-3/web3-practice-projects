require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/YOUR_ALCHEMY_API_KEY`,
      accounts: [`0x${YOUR_PRIVATE_KEY}`] //cannot proceed as goerli is dead
    }
  }
};
