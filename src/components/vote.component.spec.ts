import { BallotsItemComponent } from './ballots_item.component';
import { DoubleBallots } from "../models/double_ballots";
import { Vote } from "../models/vote";
import { VoteType } from "../enums/vote_type_enum";
import { VoteIndex } from "../enums/vote_index_enum";

let ballotsItemComponent: BallotsItemComponent = null;
let ballotsItemComponent2: BallotsItemComponent = null;

/* ------------BallotsItemComponent -------------*/
describe('BComponent is not working as expected ', () => {

    beforeEach(() => {
      ballotsItemComponent = new BallotsItemComponent();    
      ballotsItemComponent.currentBallots = 
        new DoubleBallots(1, 
                          'test question',
                          new Vote(VoteType.Text, 'test title1', 'test data1', 35),
                          new Vote(VoteType.Text, 'test title2', 'test data2', 85),
                          true);
        ballotsItemComponent.index = VoteIndex.FirstVote;
        ballotsItemComponent.votedIndex = VoteIndex.FirstVote;

        ballotsItemComponent2 = new BallotsItemComponent();    
        ballotsItemComponent2.currentBallots = 
          new DoubleBallots(1, 
                            'test question',
                            new Vote(VoteType.Text, 'test title1', 'test data1', 35),
                            new Vote(VoteType.Text, 'test title2', 'test data2', 85),
                            true);
          ballotsItemComponent2.index = VoteIndex.SecondVote;
          ballotsItemComponent2.votedIndex = VoteIndex.SecondVote;
        });
  
    it('- getVote()', () => {
      expect(ballotsItemComponent.getVotePercentage()).toBe(35);
    })  
  
    it('- isWinVote()', () => {
        expect(ballotsItemComponent.isWinVote()).toBe(false);
    })  
  
    it('- isLooseVote()', () => {
        expect(ballotsItemComponent.isLooseVote()).toBe(true);
    })  
  
    it('- getVoteData()', () => {
        expect(ballotsItemComponent.getVoteData()).toBe('test data1');
    })  
  
    it('- getBallotsQuestion()', () => {
        expect(ballotsItemComponent.getBallotQuestion()).toBe('test question');
    })  
  
    it('- getVoteTitle()', () => {
        expect(ballotsItemComponent.getVoteTitle()).toBe('test title1');
    })  
  
    it('- getCurrentBallots()', () => {
        expect(ballotsItemComponent.currentBallots.
            equales(ballotsItemComponent2.currentBallots)).toBe(true);
    })  
  
    it('- getVoteItemClass()', () => {
        expect(ballotsItemComponent.getVoteItemClass()).toBe('vote_item_selected');
    })  
  
    it('(test1) - getVoteClass()', () => {
        expect(ballotsItemComponent.getVoteClass()).toBe('loosing_vote_value');
    })  
  
    it('(test2) - getVoteClass()', () => {
        expect(ballotsItemComponent2.getVoteClass()).toBe('winning_vote_value');
    })  
  
    it('- wasVoted()', () => {
        expect(ballotsItemComponent.wasVoted()).toBe(true);
    })  
  
    it('- isPictureVote()', () => {
        expect(ballotsItemComponent.isPictureVote()).toBe(false);
    })  
  
    it('- isTextVote()', () => {
        expect(ballotsItemComponent.isTextVote()).toBe(true);
    })  
  
  });
  