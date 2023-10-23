// 17:26:30 --> Automatic Constant Value UI Updater
// we created this file index.js just for us to easily export these files called
// abi.json and contractAddress.json

const contractAddresses = require("../constants/contractAddresses.json")
const abi = require("../constants/abi.json")

module.exports = {
    contractAddresses,
    abi
}

