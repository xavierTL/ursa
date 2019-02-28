pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract ElectionManager is ERC20 {

    string public smokeTest = "its working nicely";

    struct Election {
        address creator;
        string electionName;
        uint startTime;
        uint endTime;
        uint[] candidateData;
        address[] whiteList;
    }

    struct Candidate  {
        uint id;
        string name;
        uint voteCount;
    }

    uint public electionCount;
    mapping(uint => Election) public elections;
    mapping(uint => Candidate) candidateStorage;
    uint candidatesCount;
    uint[] candidateIds;

    function startElection(string memory _electionName, uint _startTime, uint _endTime, address[] memory _whiteList) public returns (uint) {
        electionCount++;
        uint start = block.timestamp + _startTime;
        uint end = block.timestamp + _endTime;
        elections[electionCount] = Election(msg.sender, _electionName, start, end, new uint[](0), new address[](0));
        candidatesCount++;
        candidateIds.push(candidatesCount);
        candidateStorage[candidatesCount] = Candidate(
            candidatesCount,
            "Spoil ballot",
            0
            );
        elections[electionCount].candidateData.push(candidatesCount);

        for (uint j = 0; j < _whiteList.length ; j++){
            registerVoter(electionCount, _whiteList[j]);
        }
        return electionCount;
    }

    function getElectionCandidates(uint i) public view returns (uint[] memory){
        return elections[i].candidateData;
    }

    function getCandidate(uint _id) public view returns (uint, string memory, uint) {
        return (candidateStorage[_id].id, candidateStorage[_id].name, candidateStorage[_id].voteCount);
    }

    function addNewCandidate(uint electionId, string memory newCandidateName) public   {
        require(msg.sender == elections[electionId].creator, "Only admin can add candidates to this election.");

        // require(elections[electionId].startTime >= block.timestamp, "New candidates must be added before voting opens.");

        candidatesCount++;
        candidateIds.push(candidatesCount);
        candidateStorage[candidatesCount] = Candidate(
            candidatesCount,
            newCandidateName,
            0
            );
        elections[electionId].candidateData.push(candidatesCount);
    }

    function voteForCandidate(uint _id, uint _electionId) public returns (uint, string memory, uint) {
        require(elections[_electionId].endTime >= block.timestamp, "The election has already ended.");
        require(elections[_electionId].startTime <= block.timestamp, "The election has not started yet.");

        address[] memory array = getRegistry(_electionId);
        for (uint i = 0; i < array.length ; i++) {
            if(array[i] == msg.sender) {
                require(transfer(elections[_electionId].creator, 1), "You have already voted.");
                candidateStorage[_id].voteCount++;
                return (candidateStorage[_id].id, candidateStorage[_id].name, candidateStorage[_id].voteCount);
            }
        }
    }

    function getRegistry(uint electionId) public view returns (address[] memory){
        return elections[electionId].whiteList;
    }
    
    function registerVoter(uint electionId, address voter) public {
        require(msg.sender == elections[electionId].creator, "Only admin can add voters to this election's registry.");
        require(elections[electionId].startTime >= block.timestamp, "New voters must be added prior to start time.");
        require(elections[electionId].creator != voter, "Admin cannot be added to registry.");
        elections[electionId].whiteList.push(voter);
        mint(1);
        distributeToken(voter);
    }
     
    function mint(uint _tokens) private {
        _mint(msg.sender, _tokens);
    }

    function distributeToken(address _voter) public {
        transfer(_voter, 1);
    }
}