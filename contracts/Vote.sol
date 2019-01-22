pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract Vote is ERC20 {

    string public smokeTest = "smokeTest";

    struct Election {
        address creator;
        string electionName;
        uint startTime;
        uint endTime;
        uint[] candidateData;
        address[] whiteList;
    }

    uint public electionCount;
    mapping(uint => Election) public elections;
    mapping(uint => Candidate) candidateStorage;
    uint candidatesCount;
    uint[] candidateIds;

    function startElection(string memory _electionName, uint _startTime, uint _endTime, string memory seedCandidate, address[] memory _whiteList) public returns (uint) {
        electionCount++;
        uint start = setTimer(_startTime);
        uint end = setTimer(_endTime);
        mint(_whiteList.length);
        elections[electionCount] = Election(msg.sender, _electionName, start, end, new uint[](0), new address[](0));
        candidatesCount++;
        candidateIds.push(candidatesCount);
        candidateStorage[candidatesCount] = Candidate(
            candidatesCount,
            seedCandidate,
            0
            );
        elections[electionCount].candidateData.push(candidatesCount);

        for (uint j = 0; j < _whiteList.length ; j++){
            elections[electionCount].whiteList.push(_whiteList[j]);
            distributeToken(_whiteList[j]);
        }
        return electionCount;
    }

    function getElectionCandidates(uint i) public view returns (uint[] memory){
        return elections[i].candidateData;
    }

    function addNewCandidate(uint electionId, string memory newCandidateName) public   {
        require(msg.sender == elections[electionId].creator, "Only admin can add candidates to this election.");
        candidatesCount++;
        candidateIds.push(candidatesCount);
        candidateStorage[candidatesCount] = Candidate(
            candidatesCount,
            newCandidateName,
            0
            );
        elections[electionId].candidateData.push(candidatesCount);
    }

    function getWhiteList(uint electionId) public view returns (address[] memory){
        return elections[electionId].whiteList;
    }

    function addToWhitelist(uint electionId, address voter) public {
        require(msg.sender == elections[electionId].creator, "Only admin can add voters to this election's whitelist.");
        elections[electionId].whiteList.push(voter);
        mint(1);
        distributeToken(voter);
    }

    function getCandidate(uint _id) public view returns (uint, string memory, uint) {
        return (candidateStorage[_id].id, candidateStorage[_id].name, candidateStorage[_id].voteCount);
    }

    // function voteForCandidate(uint _id, uint _electionCount) public returns (uint, bytes32, uint) {
    //     if(elections[_electionCount].expirationTime > block.timestamp) {
    //         address[] memory array = getWhiteList(_electionCount);
    //         for (uint i = 0; i < array.length ; i++) {
    //             if(array[i] == msg.sender) {
    //                 if(transfer(elections[_electionCount].creator, 1)) {
    //                     candidateStorage[_id].voteCount++;
    //                     return (candidateStorage[_id].id, candidateStorage[_id].name, candidateStorage[_id].voteCount);
    //                 }
    //             }
    //         }
    //     }
    // }

    struct Candidate  {
        uint id;
        string name;
        uint voteCount;
    }

    function setTimer(uint _voteLength) public view returns (uint) {
        uint StartTime = block.timestamp;
        return StartTime + _voteLength;
    }
    
    function mint(uint _tokens) private {
        _mint(msg.sender, _tokens);
    }

    function distributeToken(address _voter) public {
        transfer(_voter, 1);
    }
}