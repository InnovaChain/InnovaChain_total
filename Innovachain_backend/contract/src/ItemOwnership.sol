// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ItemOwnership {
    // Define a struct to represent an item
    struct Item {
        uint256 id; // Unique identifier for the item
        string name; // Name of the item
    }

    // Use a mapping to associate addresses with an array of Items
    mapping(address => Item[]) private _ownedItems;

    // Use a mapping to check if an item ID has been assigned and to store the item's owner
    mapping(uint256 => address) private _itemOwners;

    // Use a mapping to store the relationship between item IDs and item names
    mapping(uint256 => string) private _itemNameById;

    // Event to record the addition of items
    event ItemAdded(address indexed owner, uint256 indexed itemId);

    // Function that allows users to add a new item to their list of owned items
    function addItem(uint256 _id, string memory _name) public {
        require(_itemOwners[_id] == address(0), "Item ID already exists");

        // Create a new item instance
        Item memory newItem = Item({id: _id, name: _name});

        // Add the new item to the caller's list of owned items
        _ownedItems[msg.sender].push(newItem);

        // Record the item's owner
        _itemOwners[_id] = msg.sender;

        // Store the relationship between the item ID and the item name
        _itemNameById[_id] = _name;

        // Emit the event
        emit ItemAdded(msg.sender, _id);
    }

    // Function to retrieve all items owned by a specific address
    function getOwnedItems() public view returns (Item[] memory) {
        return _ownedItems[msg.sender];
    }

    // Function to retrieve a single item owned by a specific address based on index
    function getItemByIndex(uint256 index) public view returns (Item memory) {
        require(index < _ownedItems[msg.sender].length, "Index out of bounds");
        return _ownedItems[msg.sender][index];
    }

    // Function to retrieve the owner of an item based on its ID
    function getOwnerById(uint256 _id) public view returns (address) {
        return _itemOwners[_id];
    }

    // New function to retrieve the name of an item based on its ID
    function getItemNameById(uint256 _id) public view returns (string memory) {
        require(_itemOwners[_id] != address(0), "Item ID does not exist");
        return _itemNameById[_id];
    }
}
