// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/ItemOwnership.sol";

contract ItemOwnershipTest is Test {
    ItemOwnership public itemOwnership;

    function setUp() public {
        itemOwnership = new ItemOwnership();
    }
}
