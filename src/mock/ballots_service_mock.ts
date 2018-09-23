import { BallotsService } from '../services/ballots_service';
import { VoteFactory } from './vote_factory';
import { DoubleBallots } from '../models/double_ballots';
import { Vote } from '../models/vote';
import { Observable } from 'rxjs/Observable';
import { ServerToClientMapper } from '../server/server_to_client_mapper';

export class BallotsServiceMock extends BallotsService {
    private questions: string[] = ["Which car would you like?", 
                                   "Choose a car",
                                   "Red or Green?",
                                   "Which car would you get?",
                                   "Please choose one",
                                   "Blue or White?"];
                                  
    private currBallots: DoubleBallots = null;
    
    registerBallots(ballotId: number, index: number): Observable<Object> {
        return new Observable(observer => {
            let ballots = this.restPostBallots(ballotId, index);
            let serverBallots = new ServerToClientMapper().toServerBallots(ballots);
            observer.next([serverBallots]);
            observer.complete();
        });
    }

    restPostBallots(ballotId: number, index: number): DoubleBallots {
        let percentage = Math.floor((Math.random() * 100) + 1);
        let firstVote: Vote = 
            VoteFactory.getNewVote(this.currBallots.getFirstVote().getType(),
                                   this.currBallots.getFirstVote().getTitle(),
                                   this.currBallots.getFirstVote().getData(),
                                   percentage);
        let secondVote: Vote = 
            VoteFactory.getNewVote(this.currBallots.getSecondVote().getType(), 
                                   this.currBallots.getSecondVote().getTitle(),
                                   this.currBallots.getSecondVote().getData(),
                                   100 - percentage);

        this.currBallots = new DoubleBallots(this.currBallots.getId(),
                                             this.currBallots.getQuestion(),
                                             firstVote,
                                             secondVote,
                                             false);

        return this.currBallots;
    }
    
    getNextBallots(): Observable<Object> {
        return new Observable(observer => {
            this.currBallots = this.restGetOneDoubleBallots(true);
            let serverBallots = new ServerToClientMapper().toServerBallots(this.currBallots);
            observer.next([serverBallots]);
            observer.complete();
        });
    }

    getPreviousBallots(): Observable<Object> {
        return new Observable(observer => {
            this.currBallots = this.restGetOneDoubleBallots(true);
            let serverBallots = new ServerToClientMapper().toServerBallots(this.currBallots);
            observer.next([serverBallots]);
            observer.complete();
        });
    }


    private restGetOneDoubleBallots(isNew: boolean): DoubleBallots {
        let percentage = Math.floor((Math.random() * 100) + 1);
        let id = Math.floor((Math.random() * 100000) + 1);
        let questionIndex = Math.floor(Math.random() * this.questions.length);

        let firstVote: Vote = VoteFactory.getNewVote(null, null, null, 
                                                     isNew ? -1 : percentage);
        let secondVote: Vote = VoteFactory.getNewVote(null, null, null, 
                                                     isNew ? -1 : 100 - percentage);

        this.currBallots = new DoubleBallots(id,
                                             this.questions[questionIndex], 
                                             firstVote,
                                             secondVote,
                                             isNew);

        return this.currBallots;
    }

    getDefaultBallots(): DoubleBallots {
        let vote: Vote = VoteFactory.getNewVote(1, '', '', 0);
        return new DoubleBallots(1, '', vote, vote, false);    
      }
  
}