const ElectionManager = artifacts.require('./ElectionManager.sol');

contract('ElectionManager', accounts => {
  let instance;
  let electionCandidates;

  before(async () => {
    instance = await ElectionManager.deployed();

    await instance.startElection('Test Election', 0, 100000, [
      accounts[1],
      accounts[2],
      accounts[3]
    ]);
    electionCandidates = await instance.getElectionCandidates(1);
  });

  describe('startElection', () => {
    it('contract successfully compiles', async () => {
      const smokeTest = await instance.smokeTest();
      expect(smokeTest).to.eql('its working nicely');
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

      expect(testElection.creator).to.equal(accounts[0]);
      expect(testElection.electionName).to.equal('Test Election');

      const now = Math.floor(Date.now() / 1000);

      // allowing 10s of delay when testing start/end times to accommodate block timestamps.

      const roughStart = Math.floor(testElection.startTime.toNumber() / 10);
      const roughEnd = Math.floor(testElection.endTime.toNumber() / 10);

      expect(roughStart).to.equal(Math.floor(now / 10));
      expect(roughEnd).to.equal(Math.floor(now / 10) + 10000);
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
        expect(electionCandidate['1']).to.equal('Spoil ballot');
        expect(electionCandidate['2'].toNumber()).to.equal(0);
      });
    });
    describe('getRegistry', () => {
      it('returns an array of addresses of the eligable voters', async () => {
        const whiteList = await instance.getRegistry(1);
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
      await instance.addNewCandidate(1, 'First Candidate');
      const newCandidate = await instance.getCandidate(2);
      expect(newCandidate['0'].toNumber()).to.equal(2);
      expect(newCandidate['1']).to.equal('First Candidate');
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
      // checking that a new candidate has not been added to election.
      const newBadCandidate = await instance.getCandidate(3);
      const updatedElectionCandidates = await instance.getElectionCandidates(1);
      expect(newBadCandidate['0'].toNumber()).to.equal(0);
      expect(newBadCandidate['1']).to.equal('');
      expect(newBadCandidate['2'].toNumber()).to.equal(0);
      expect(updatedElectionCandidates.length).to.eql(2);
    });
    // no test for adding candidate before election starts.
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
      // election with an end date that has already passed.
      await instance.startElection('Two', 0, -100, [
        accounts[1],
        accounts[2],
        accounts[3]
      ]);
      try {
        await instance.voteForCandidate(1, 2, { from: accounts[1] });
      } catch (error) {
        expect(error.reason).to.eql('The election has already ended.');
      }
    });
    it('cannot vote before the election has started', async () => {
      // election with a start date one day from now, end date two days from now.
      await instance.startElection('Three', 86400, 172800, [
        accounts[1],
        accounts[2],
        accounts[3]
      ]);
      try {
        await instance.voteForCandidate(1, 3, { from: accounts[1] });
      } catch (error) {
        expect(error.reason).to.eql('The election has not started yet.');
      }
    });
    it('A registered voter can only vote once', async () => {
      // election with one voter who has not been added to other test elections.
      await instance.startElection('Four', 0, 10000000, [accounts[8]]);
      try {
        await instance.voteForCandidate(5, 4, { from: accounts[8] });
      } catch (error) {
        console.log(error);
      }
      try {
        await instance.voteForCandidate(5, 4, { from: accounts[8] });
      } catch (error) {
        console.log(error);
        expect(error.reason).to.eql('you have already voted.');
      }
    });
  });

  describe('registerVoter', () => {
    it('admin cannot be registered', async () => {
      try {
        await instance.startElection('Test Election Five', 300, 800, [
          accounts[0],
          accounts[2],
          accounts[3]
        ]);
      } catch (error) {
        expect(error.reason).to.eql('Admin cannot be added to registry.');
      }
    });
    it('adds voter address to election registry', async () => {
      await instance.startElection('Test Election Five', 300, 800, [
        accounts[1],
        accounts[2],
        accounts[3]
      ]);
      await instance.registerVoter(5, accounts[4]);
      const whiteList = await instance.getRegistry(5);
      expect(whiteList.length).to.eql(4);
      expect(whiteList[3]).to.eql(accounts[4]);
    });
    it('provides that voter with one token', async () => {
      const balance = await instance.balanceOf(accounts[4]);
      expect(balance.toNumber()).to.equal(1);
    });
    it('only allows election creator to add new voter addresses to whitelist', async () => {
      try {
        await instance.registerVoter(5, accounts[5], {
          from: accounts[1]
        });
      } catch (error) {
        expect(error.reason).to.eql(
          "Only admin can add voters to this election's registry."
        );
      }
    });
    it('voters cannot be added after start time', async () => {
      await instance.startElection('Test Election Six', 0, 800, [
        accounts[1],
        accounts[2],
        accounts[3]
      ]);
      try {
        await instance.registerVoter(5, accounts[4]);
      } catch (error) {
        expect(error.reason).to.eql(
          'New voters must be added prior to start time.'
        );
      }
    });
  });
});
