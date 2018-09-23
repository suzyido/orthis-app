import { ServerToClientMapper } from './../../server/server_to_client_mapper';
import { HomePage } from './home';
import { BallotsServiceForUnitTest } from '../../mock/ballots_service_for_unit_test';
import { ScreenOrientationMock } from '../../mock/screen-orientation-mock';
import { VoteIndex } from '../../enums/vote_index_enum';
import { DoubleBallots } from '../../models/double_ballots';

describe('HomePage is not working as expected ', () => {
  let comp: HomePage;
  let ballotsService: BallotsServiceForUnitTest;
  let screenOrientation: ScreenOrientationMock;

  beforeEach(() => {
    ballotsService = new BallotsServiceForUnitTest(null);
    screenOrientation = new ScreenOrientationMock();
    comp = new HomePage(null, screenOrientation, ballotsService);
    let serverToClientMapper = new ServerToClientMapper();
    let serverBallots = serverToClientMapper.getDummyServerBallots();
    let ballots = serverToClientMapper.toClientBallots(serverBallots);
    comp.setCurrentBallots(ballots);
  });

  it('- onVotePercentage(VoteIndex.FirstVote)', () => {
    expect(comp.getVotePercentage(VoteIndex.FirstVote)).toBe(40);
  })  

  it('- getImageVoteData(VoteIndex.FirstVote)', () => {
    expect(comp.getImageVoteData(VoteIndex.FirstVote)).toBe('http');
  })  

  it('- getBallotQuestion()', () => {
    expect(comp.getBallotsQuestion()).toBe('first question');
  })  

  it('- getVoteTitle(VoteIndex.SecondVote)', () => {
    expect(comp.getVoteTitle(VoteIndex.SecondVote)).toBe('second description');
  })  

  it('- getCurrntBallots()', () => {
    let serverToClientMapper = new ServerToClientMapper();
    let serverBallots = serverToClientMapper.getDummyServerBallots();
    let ballots = serverToClientMapper.toClientBallots(serverBallots);
    expect(comp.getCurrentBallots().
      equales(ballots)).toBe(true);
  })  

  it('- getCurrentScreenOrientation()', () => {
    expect(comp.getCurrentScreenOrientation() != null).toBe(true);
  })  

});
