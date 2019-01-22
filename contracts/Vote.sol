pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract Vote is ERC20 {

    string public smokeTest = "smokeTest";

    struct Election {
        address creator;
        string electionName;
        uint startTime;
        uint endTime;
        uint candidatesCount;
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
        elections[electionCount] = Election(msg.sender, _electionName, start, end, 1, new uint[](0), new address[](0));
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

    function addNewCandidate(uint electionId, string newCandidateName) public view returns (uint, string memory, uint) {
        candidatesCount++;
        candidateIds.push(candidatesCount);
        candidateStorage[candidatesCount] = Candidate(
            candidatesCount,
            newCandidateName,
            0
            );
        elections[electionId].candidateData.push(candidatesCount);
        return (candidateStorage[candidatesCount].id, candidateStorage[candidatesCount].name, candidateStorage[candidatesCount].voteCount);
    }

    function getWhiteList(uint i) public view returns (address[] memory){
        return elections[i].whiteList;
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