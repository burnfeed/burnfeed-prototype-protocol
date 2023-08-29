// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const { expect } = require("chai");

async function main() {

    const [deployer] = await ethers.getSigners();

    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

     const Simpub = await ethers.getContractFactory("SimPubProtocol");
     let simpub = await Simpub.deploy();

    // const simpub =  Simpub.attach("0x1E5fB07F8032060a30738Daa74A38ae7Eba56e74");

    console.log("contract address:",simpub.address);
    
    let bytesC = '0x0000000000000000000000000000000000000000000000000000000000000000';
     let addr1 = simpub.address;
    var action  = { subtype: 0, tweet: bytesC, comment: bytesC, newTweet: bytesC, followee: addr1, burn: 10000 };
  
    var action1  = { subtype: 2, tweet: bytesC, comment: bytesC, newTweet: bytesC, followee: addr1, burn: 10000 };
  
     let tx = await simpub.publishActions([action,action1], { value: 20000 });
     tx = await tx.wait()
     console.log(tx.events[0].args.creator);
     console.log(tx.events[0].args.tweet);
     console.log(tx.events[0].args.burn);



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
