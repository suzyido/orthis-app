import { Vote } from './vote';
import { VoteType } from '../enums/vote_type_enum';
import { DoubleBallots } from './double_ballots';

let vote: Vote = null;
let ballots: DoubleBallots = null; 
let ballots2: DoubleBallots = null; 

/* ------------Vote -------------*/
describe('Vote is not working as expected ', () => {

  beforeAll(() => {
    vote = new Vote(VoteType.Picture, 'test title', 'test data', 25);    
  });

  it('- getType()', () => {
    expect(vote.getType()).toBe(VoteType.Picture);
  })

  it('- getTitle()', () => {
    expect(vote.getTitle()).toBe('test title');
  })

  it('- getData()', () => {
    expect(vote.getData()).toBe('test data');
  })

  it('- getPercentage()', () => {
    expect(vote.getPercentage()).toBe(25);
  })

  it('- equales()', () => {
    expect(vote.equals(
      new Vote(VoteType.Picture, 'test title', 'test data', 25))).toBe(true);
  })

});

/* ------------Ballots/Double Ballots -------------*/
describe('Ballots is not working as expected ', () => {

  beforeEach(() => {
    ballots = new DoubleBallots(1, 
                                'test question',
                                new Vote(VoteType.Text, 'test title1', 'test data1', 35),
                                new Vote(VoteType.Text, 'test title2', 'test data2', 45),
                                true);    
    ballots2 = new DoubleBallots(1, 
                                 'test question',
                                 new Vote(VoteType.Text, 'test title1', 'test data1', 35),
                                 new Vote(VoteType.Text, 'test title2', 'test data2', 45),
                                 true);    
  });

  it('- getId()', () => {
    expect(ballots.getId()).toBe(1);
  })

  it('- getQuestion()', () => {
    expect(ballots.getQuestion()).toBe('test question');
  })

  it('- getFirstVote()', () => {
    expect(ballots.getFirstVote().equals(
      new Vote(VoteType.Text, 'test title1', 'test data1', 35))).toBe(true);
  })

  it('- getSecondVote()', () => {
    expect(ballots.getSecondVote().equals(
      new Vote(VoteType.Text, 'test title2', 'test data2', 45))).toBe(true);
  })

  it('- isNew()', () => {
    expect(ballots.isNew()).toBe(true);
  })

  it('- markAsNotNew()', () => {
    ballots.markAsNotNew();
    expect(ballots.isNew()).toBe(false);
  })

  it('- equals()', () => {
    expect(ballots.equales(ballots2)).toBe(true);
  })

});
