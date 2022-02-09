// 0. https://remix.ethereum.org/
// 0.0. create a file on main root
// 1. talk about pragma
// 2. contract name Token & file name needs to be same
// 3. talk about genesis block
// 4. bep20 protocol functions balanceOf, transfer
// 5. public readonly functions
// 6. what does require do?

// OTHER: msg.sender will be the person who's currently connecting with the contract.

// "SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.8.2;

contract Token {
    // 0x8938043124 => 20
    mapping(address => uint) public balances;
    // 0x8938043124
    // - 0x8938043124ABC => 20
    // - 0x8938043124XYZ => 300
    // - 0x8938043124ASD => 1300
    mapping(address => mapping(address => uint)) public allowance;

    uint public totalSupply = 10000 * 10 ** 18;
    string public name = "My Token";
    string public symbol = "MTKN";
    uint public decimals = 18;

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);

    constructor() {
        balances[msg.sender] = totalSupply;
    }
 
    function balanceOf(address owner) public view returns(uint) {
        return balances[owner];
    }

    function transfer(address to, uint value) public returns(bool) {
        require(balanceOf(msg.sender) >= value, 'balance too low, you poor guy');

        balances[to] += value;
        balances[msg.sender] -= value;

        emit Transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint value) public returns(bool) {
        require(balanceOf(from) >= value, 'balance too low, you poor guy');
        require(allowance[from][msg.sender] >= value, 'allowance too low');

        balances[to] += value;
        balances[from] -= value;

        emit Transfer(from, to, value);
        return true;
    }

    function approve(address spender, uint value) public returns(bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
}