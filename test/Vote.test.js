const Vote = artifacts.require('./Vote.sol');

contract('Vote', accounts => {
  let instance;
  let electionCandidates;

  before(async () => {
    instance = await Vote.deployed();

    await instance.startElection(
      'Test Election',
      0,
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
        'creator',
        'electionName',
        'startTime',
        'endTime'
      ]);
      const startTime = await instance.setTimer(0);
      const endTime = await instance.setTimer(100000);

      expect(testElection.creator).to.equal(accounts[0]);
      expect(testElection.electionName).to.equal('Test Election');
      // given time tests 10 seconds of variation to accomodate block mining time.
      expect(Math.floor(testElection.startTime.toNumber() / 10)).to.equal(
        Math.floor(startTime.toNumber() / 10)
      );
      expect(Math.floor(testElection.endTime.toNumber() / 10)).to.equal(
        Math.floor(endTime.toNumber() / 10)
      );
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
      const updatedElectionCandidates = await instance.getElectionCandidates(1);
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
      const updatedElectionCandidates = await instance.getElectionCandidates(1);
      expect(newBadCandidate['0'].toNumber()).to.equal(0);
      expect(newBadCandidate['1']).to.equal('');
      expect(newBadCandidate['2'].toNumber()).to.equal(0);
      expect(updatedElectionCandidates.length).to.eql(2);
    });
  });

  describe('voteForCandidate', () => {
    it('tansfers the token back to the owner', async () => {
      let balance = await instance.balanceOf(accounts[1]);
      expect(balance.toNumber()).to.equal(1);
      await instance.voteForCandidate(1, 1, { from: accounts[1] });
      balance = await instance.balanceOf(accounts[0]);
      expect(balance.toNumber()).to.equal(1);
      balance = await instance.balanceOf(accounts[1]);
      expect(balance.toNumber()).to.equal(0);
    });
    it('increments the correct candidates vote count by 1', async () => {
      let candidate = await instance.getCandidate(2);
      let voteCount = candidate['2'];
      expect(voteCount.toNumber()).to.equal(0);
      await instance.voteForCandidate(2, 1, { from: accounts[2] });
      candidate = await instance.getCandidate(2);
      voteCount = candidate['2'];
      expect(voteCount.toNumber()).to.equal(1);
    });
    it('cannot vote after the election has ended', async () => {
      await instance.startElection(
        'Test Election Two',
        0,
        -100,
        'Candidate Claire',
        [accounts[1], accounts[2], accounts[3]]
      );
      try {
        await instance.voteForCandidate(1, 2, { from: accounts[1] });
      } catch (error) {
        expect(error.reason).to.eql('The election has already ended.');
      }
    });
    it('cannot vote before the election has started', async () => {
      await instance.startElection(
        'Test Election Three',
        2000,
        4000,
        'Candidate Connor',
        [accounts[1], accounts[2], accounts[3]]
      );
      try {
        await instance.voteForCandidate(1, 3, { from: accounts[1] });
      } catch (error) {
        expect(error.reason).to.eql('The election has not started yet.');
      }
    });
  });

  describe('addToWhitelist', () => {
    it('adds voter address to election whitelist', async () => {
      await instance.startElection(
        'Test Election Four',
        300,
        800,
        'Candidate Chris',
        [accounts[1], accounts[2], accounts[3]]
      );
      await instance.addToWhitelist(4, accounts[4]);
      const whiteList = await instance.getWhiteList(4);
      expect(whiteList.length).to.eql(4);
      expect(whiteList[3]).to.eql(accounts[4]);
    });
    it('provides that voter with one token', async () => {
      const balance = await instance.balanceOf(accounts[4]);
      expect(balance.toNumber()).to.equal(1);
    });
    it('only allows election creator to add new voter addresses to whitelist', async () => {
      try {
        await instance.addToWhitelist(1, accounts[5], {
          from: accounts[1]
        });
      } catch (error) {
        expect(error.reason).to.eql(
          "Only admin can add voters to this election's whitelist."
        );
      }
    });
    it('voters cannot be added after start time', async () => {
      await instance.startElection(
        'Test Election Five',
        0,
        800,
        'Candidate Ciara',
        [accounts[1], accounts[2], accounts[3]]
      );
      try {
        await instance.addToWhitelist(5, accounts[4]);
      } catch (error) {
        expect(error.reason).to.eql(
          'New voters must be added prior to start time.'
        );
      }
    });
  });
});
