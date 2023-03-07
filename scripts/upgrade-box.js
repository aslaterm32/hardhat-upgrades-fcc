const { ethers } = require("hardhat")

async function main() {
    let version
    const BoxProxyAdmin = await ethers.getContract("BoxProxyAdmin")
    const transparentProxy = await ethers.getContract("Box_Proxy")

    const proxyBox = await ethers.getContractAt("Box", transparentProxy.address)
    version = await proxyBox.version()
    console.log(`Box version: v${version.toString()}`)

    const boxv2 = await ethers.getContract("BoxV2")
    console.log("Upgrading...")
    const upgradeTx = await BoxProxyAdmin.upgrade(transparentProxy.address, boxv2.address)
    await upgradeTx.wait(1)
    console.log("Upgraded Box")

    const proxyBoxV2 = await ethers.getContractAt("BoxV2", transparentProxy.address)
    version = await proxyBoxV2.version()
    console.log(`Box version: v${version.toString()}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
