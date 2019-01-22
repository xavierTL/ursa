const Vote = artifacts.require('./Vote.sol');

contract('Vote', accounts => {
  let instance;
  let electionCandidates;

  before(async () => {
    instance = await Vote.deployed();
    await instance.startElection(
      'Test Election',
      20000,
      100000,
      'First Candidate',
      [accounts[1], accounts[2], accounts[3]]
    );
    electionCandidates = await instance.getElectionCandidates(1);
  });
  describe('startElection', () => {
    it('contract successfully compiles', async () => {
      const smokeTest = await instance.smokeTest();
      expect(smokeTest).to.eql('smokeTest');
    });
    it('intitlizes an election with the correct values', async () => {
      const testElection = await instance.elections(1);
      expect(typeof testElection).to.eql('object');
      expect(testElection).to.have.all.keys([
        '0',
        '1',
        '2',
        '3',
        '4',
        'creator',
        'electionName',
        'startTime',
        'endTime',
        'candidatesCount'
      ]);
      const startTime = await instance.setTimer(20000);
      const endTime = await instance.setTimer(100000);

      expect(testElection.creator).to.equal(accounts[0]);
      expect(testElection.electionName).to.equal('Test Election');
      expect(testElection.candidatesCount.toNumber()).to.equal(1);
      expect(testElection.startTime.toNumber()).to.equal(startTime.toNumber());
      expect(testElection.endTime.toNumber()).to.equal(endTime.toNumber());
    });
    describe('getElectionCandidates', () => {
      it('returns an array containing the candidates id for a particular election', async () => {
        expect(electionCandidates[0].toNumber()).to.equal(1);
      });
    });
    describe('getCandidate', () => {
      it('returns an object containing numbered keys with corresponding candidate information', async () => {
        const electionCandidate = await instance.getCandidate(1);
        expect(electionCandidate['0'].toNumber()).to.equal(1);
        expect(electionCandidate['1']).to.equal('First Candidate');
        expect(electionCandidate['2'].toNumber()).to.equal(0);
      });
    });
    describe('getWhiteList', () => {
      it('returns an array of addresses of the eligable voters', async () => {
        const whiteList = await instance.getWhiteList(1);
        expect(whiteList[0]).to.equal(accounts[1]);
        expect(whiteList[1]).to.equal(accounts[2]);
        expect(whiteList[2]).to.equal(accounts[3]);
      });
    });
    describe('mint', () => {
      it('mints the appropriate number of tokens', async () => {
        const tokenSupply = await instance.totalSupply();
        expect(tokenSupply.toNumber()).to.equal(3);
      });
    });
    describe('distributeToken', () => {
      it('gives the supply of tokens to the correct accounts', async () => {
        let balance = await instance.balanceOf(accounts[0]);
        expect(balance.toNumber()).to.equal(0);
        balance = await instance.balanceOf(accounts[1]);
        expect(balance.toNumber()).to.equal(1);
        balance = await instance.balanceOf(accounts[2]);
        expect(balance.toNumber()).to.equal(1);
        balance = await instance.balanceOf(accounts[3]);
        expect(balance.toNumber()).to.equal(1);
      });
    });
    describe('addNewCandidate', () => {
      it('adds correct candidate data to election', async () => {
        await instance.addNewCandidate(1, 'Second Candidate');
        const newCandidate = await instance.getCandidate(2);
        expect(newCandidate['0'].toNumber()).to.equal(2);
        expect(newCandidate['1']).to.equal('Second Candidate');
        expect(newCandidate['2'].toNumber()).to.equal(0);
      });
      it('updates candidate count accordingly', async () => {
        const updatedElectionCandidates = await instance.getElectionCandidates(
          1
        );
        expect(updatedElectionCandidates.length).to.eql(2);
      });
      it('only allows election creator to add new candidates', async () => {
        try {
          await instance.addNewCandidate(1, 'Third Candidate', {
            from: accounts[1]
          });
        } catch (error) {
          expect(error.reason).to.eql(
            'Only admin can add candidates to this election.'
          );
        }
        const newBadCandidate = await instance.getCandidate(3);
        const updatedElectionCandidates = await instance.getElectionCandidates(
          1
        );
        expect(newBadCandidate['0'].toNumber()).to.equal(0);
        expect(newBadCandidate['1']).to.equal('');
        expect(newBadCandidate['2'].toNumber()).to.equal(0);
        expect(updatedElectionCandidates.length).to.eql(2);
      });
    });
    //   describe('voteForCandidate', () => {
    //     it('tansfers the token back to the owner', async () => {
    //       let balance = await instance.balanceOf(accounts[1]);
    //       expect(balance.toNumber()).to.equal(1);
    //       await instance.voteForCandidate(1, 1, { from: accounts[1] });
    //       balance = await instance.balanceOf(accounts[0]);
    //       expect(balance.toNumber()).to.equal(1);
    //       balance = await instance.balanceOf(accounts[1]);
    //       expect(balance.toNumber()).to.equal(0);
    //     });
    //     it('increments the correct candidates vote count by 1', async () => {
    //       let candidate = await instance.getCandidate(2);
    //       let voteCount = candidate['2'];
    //       expect(voteCount.toNumber()).to.equal(0);
    //       await instance.voteForCandidate(2, 1, { from: accounts[2] });
    //       candidate = await instance.getCandidate(2);
    //       voteCount = candidate['2'];
    //       expect(voteCount.toNumber()).to.equal(1);
    //     });
    //     it('cannot vote when the election has ended', async () => {
    //       await instance.startElection(
    //         'Test Election',
    //         0,
    //         ['0x63616e646964617465206f6e65', '0x63616e6469646174652074776f'],
    //         [accounts[1], accounts[2], accounts[3]]
    //       );
    //       setInterval(async () => {
    //         await instance.voteForCandidate(1, 2, { from: accounts[1] });
    //         const candidate = await instance.getCandidate(1);
    //         const voteCount = await candidate['2'];
    //         expect(voteCount.toNumber()).to.equal(0);
    //       }, 2000);
    //     });
    //   });
    //   describe('setTimer', () => {
    //     it('converts user input to unix timestamp', async () => {
    //       const instance = await Vote.deployed();
    //       await instance.startElection(
    //         'Test Election',
    //         5,
    //         ['0x63616e646964617465206f6e65', '0x63616e6469646174652074776f'],
    //         ['0x994DD176fA212730D290465e659a7c7D0549e384']
    //       );
    //       const election = await instance.elections(1);
    //       expect(typeof election.expirationTime.toNumber() === 'number');
    //     });
    //   });
  });
});
