// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IContract {
    function attempt() external;
}

contract CallAttempt {
    function callAttempt(address contractAddress) external {
        IContract(contractAddress).attempt();
    }
}
