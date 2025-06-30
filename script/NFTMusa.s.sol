// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "forge-std/Script.sol";
import "../src/NFTMusa.sol";

contract DeployNFTMusa is Script {
    function run() external {
        vm.startBroadcast();
        NFTMusa nft = new NFTMusa();
        console.log("NFTMusa deployed to:", address(nft));
        vm.stopBroadcast();
    }
}
