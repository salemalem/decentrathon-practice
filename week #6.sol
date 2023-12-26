// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract votes {

    uint yes;
    uint no;

    event output (
        address user,
        bool vote
    );

    function YesNo (bool curVote) public {
        if(curVote) yes++;
        else no++;
        emit output(msg.sender, curVote);
    }

    function result() public view returns (string memory) {
        if(yes > no) return ("yes");
        else if(yes < no) return ("no");
        else return ("draw");
    }
    
}