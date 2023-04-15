const ethers = require("ethers")
// const solc = require("solc")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
    
    let provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
    // let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    
    const nftabi = fs.readFileSync("./constants/BasicNft.json", "utf8")
    
    const nftaddress = '0xd8f65552dE03BA8366B4b646B4EA2b3045fE2721' // WETH Contract
    const contract = new ethers.Contract(nftaddress, nftabi, wallet)
    const address = await wallet.getAddress()
    // 读取WETH合约的链上信息（WETH abi）
    console.log("\n1. 读取信息")
    const balanceWETH = await contract.balanceOf(address)
    console.log(`数量: ${balanceWETH}\n`)

    const tx = await contract.mintNft()
    // 等待交易上链
    await tx.wait()
    console.log(`交易详情：`)
    console.log(tx)
    const balanceWETH_deposit = await contract.balanceOf(address)
    console.log(`mint后数量:${balanceWETH_deposit}\n`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

