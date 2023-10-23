// 16:07:45 -----> Raffle.sol Staging Tests
// from 16:07:45  to 16:18:18

/**
 * @notice We wrote staging test
 */

const { network, getNamedAccounts, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { assert, expect } = require("chai")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Test", function () {
          let raffle, raffleEntranceFee, deployer

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              raffle = await ethers.getContract("Raffle", deployer)
              raffleEntranceFee = await raffle.getEntranceFee()
          })

          describe("fulfillRandomWords", function () {
              it("works with live Chainlink Keepers and Chainlink VRF, we get a random winner", async function () {
                  /**
                   * notice We enter the raffle
                   */
                  console.log("Setting up test...")
                  const startingTimeStamp = await raffle.getLastTimeStamp()
                  const accounts = await ethers.getSigners()
                  /**
                   * @notice We setup listener before we enter the raffle, Just in case the blockchain moves Really fast
                   */
                  console.log("Setting up Listener...")
                  await new Promise(async (resolve, reject) => {
                      raffle.once("WinnerPicked", async () => {
                          console.log("WinnerPicked event fired!")
                          try {
                              /**
                               * @notice We add our assert here
                               */
                              const recentWinner = await raffle.getRecentWinner()
                              const raffleState = await raffle.getRaffleState()
                              const winnerEndingBalance = await accounts[0].getBalance()
                              const endingTimeStamp = await raffle.getLastTimeStamp()

                                console.log(recentWinner)
                                console.log(raffleState)
                                console.log(winnerEndingBalance)
                                console.log(endingTimeStamp)

                              await expect(raffle.getPlayer(0)).to.be.reverted
                              assert.equal(recentWinner.toString(), accounts[0].address)
                              assert.equal(raffleState, 0)
                              assert.equal(
                                  winnerEndingBalance.toString(),
                                  winnerStartingBalance.add(raffleEntranceFee).toString()
                              )
                              assert(endingTimeStamp > startingTimeStamp)
                              resolve()
                          } catch (error) {
                              console.log(error)
                              reject(error)
                          }
                      })

                      /**
                       * @notice Now we want to enter the raffle
                       * @dev We need to keep in kind that this code WONT complete until our 
                       * listener has finished listening! i.e "WinnerPicked"
                       */
                      console.log("Entering Raffle...")
                      await raffle.enterRaffle({ value: raffleEntranceFee })
                      console.log("Ok, time to wait...")
                      const winnerStartingBalance = await accounts[0].getBalance()
                  })
              })
          })
      })

