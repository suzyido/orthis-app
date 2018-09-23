import { Vote } from './vote';
import { Ballots } from './ballots';

export class DoubleBallots extends Ballots {
    constructor(id: number,
                question: string,
                private firstVote: Vote, 
                private secondVote: Vote,
                isNewBallots: boolean) {
        super(id, question, isNewBallots);
    }

    getFirstVote() : Vote { // Unit Tested
        return this.firstVote;
    }

    getSecondVote() : Vote { // Unit Tested
        return this.secondVote;
    }

    equales(ballots: DoubleBallots) { // Unit Tested
        return super.equales(<Ballots>ballots) &&
               this.firstVote.equals(ballots.getFirstVote()) &&
               this.secondVote.equals(ballots.getSecondVote());
    }
}