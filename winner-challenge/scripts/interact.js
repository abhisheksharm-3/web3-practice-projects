async function main() {
    const [deployer] = await ethers.getSigners();
  
    const callAttemptAddress = "YOUR_CALL_ATTEMPT_CONTRACT_ADDRESS";
    const targetContractAddress = "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502";
  
    const CallAttempt = await ethers.getContractFactory("CallAttempt");
    const callAttempt = CallAttempt.attach(callAttemptAddress);
  
    const tx = await callAttempt.callAttempt(targetContractAddress);
    await tx.wait();
  
    console.log("Transaction hash:", tx.hash);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  