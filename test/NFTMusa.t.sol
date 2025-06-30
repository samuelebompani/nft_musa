// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "forge-std/Test.sol";
import "../src/NFTMusa.sol";

contract NFTMusaTest is Test {
    NFTMusa public nft;
    address public owner;
    address public user1;
    string public sampleURI = "ipfs://sample-token-uri";

    function setUp() public {
        owner = address(this);
        user1 = vm.addr(1);
        nft = new NFTMusa();
    }

    function testOwnerIsDeployer() public view {
        assertEq(nft.owner(), owner);
    }

    function testMintIncreasesTokenId() public {
        uint256 tokenId = nft.safeMint(user1, sampleURI);
        assertEq(tokenId, 0);

        uint256 tokenId2 = nft.safeMint(user1, sampleURI);
        assertEq(tokenId2, 1);
    }

    function testMintAssignsOwnership() public {
        uint256 tokenId = nft.safeMint(user1, sampleURI);
        assertEq(nft.ownerOf(tokenId), user1);
    }

    function testTokenURISetCorrectly() public {
        uint256 tokenId = nft.safeMint(user1, sampleURI);
        assertEq(nft.tokenURI(tokenId), sampleURI);
    }

    function testOnlyOwnerCanMint() public {
        vm.prank(user1);
        vm.expectRevert("Ownable: caller is not the owner");
        nft.safeMint(user1, sampleURI);
    }

    function testBurnRemovesToken() public {
        uint256 tokenId = nft.safeMint(user1, sampleURI);

        vm.prank(user1);
        nft.approve(user1, tokenId); // approve self to burn

        vm.prank(user1);
        nft.burn(tokenId);

        vm.expectRevert("ERC721: invalid token ID");
        nft.ownerOf(tokenId);
    }
}
