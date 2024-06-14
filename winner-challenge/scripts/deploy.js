async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const CallAttempt = await ethers.getContractFactory("CallAttempt");
    const callAttempt = await CallAttempt.deploy();
  
    console.log("CallAttempt deployed to:", callAttempt.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  