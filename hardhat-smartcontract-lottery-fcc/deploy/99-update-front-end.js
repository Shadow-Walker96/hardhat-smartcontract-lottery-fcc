// Lesson 10: 17:28:53 --> Automatic Constant Value UI Updater

const { ethers, network } = require("hardhat")
const fs = require("fs")
/**
 * @notice we want to create a script such that when we run 'yarn hardhat deploy'
 * @notice it will update the content of both contractAddresses.json and abi.json
 * @dev when this '99-update-front-end.js' script is run it will update the frontend
 * @dev folder called constant and when there is changes in the backend 
 * @dev it will update the folder for us
 */

const FRONT_END_ADDRESSES_FILE = "../nextjs-smartcontract-lottery-fcc/constants/contractAddresses.json"
const FRONT_END_ABI_FILE = "../nextjs-smartcontract-lottery-fcc/constants/abi.json"

module.exports = async function () {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating front end...")
        updateContractAddresses()
        updateAbi()
    }
}

/**
 * @notice we created a function called updateContractAddress that will update the file content in the frontend
 * @dev line 1 -> Get the raffle contract
 * @dev line 2 -> create a variable to hold the chainId and convert it to a string
 * @dev line 3 -> Convert JSON string into an object, which read the file of the constants in the frontend
 * @dev line 4 -> Check if the chainId is in the contractAddresses
 * @dev line 5 -> also check if the raffle.address dosen't exist
 * @dev line 6 -> add the raffle.address to the chainId area
 */
async function updateContractAddresses() {
    const raffle = await ethers.getContract("Raffle")
    const chainId = network.config.chainId.toString()
    const currentAddresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8"))
    if (chainId in currentAddresses) {
        if (!currentAddresses[chainId].includes(raffle.address)) {
            currentAddresses[chainId].push(raffle.address)
        }
    }
    {   
        /**
        * @dev else, we created a new array that write the new contract address i.e [raffle.address]
        * @dev to the currentAddresses of specific chainId
        */
        currentAddresses[chainId] = [raffle.address]
    }
    /**
     * @dev Converts the JavaScript value to JSON and write this new file FRONT_END_ADDRESSES_FILE
     */
    fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddresses))
}

/**
 * @notice we created a function called updateAbi which will update our frondend folder called constants with the abi
 * @dev line 1 -> we get the raffle contract
 * @dev This code i.e 'raffle.interface.format(ethers.utils.FormatTypes.json)' gets the abi directly
 * @dev line 2 -> we write the abi to the frontend folder called constant in the file called abi
 */
async function updateAbi() {
    const raffle = await ethers.getContract("Raffle")
    fs.writeFileSync(FRONT_END_ABI_FILE, raffle.interface.format(ethers.utils.FormatTypes.json))
}

module.exports.tags = ["all", "frontend"]
