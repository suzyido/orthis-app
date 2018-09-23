import { ServerToClientMapper } from '../server/server_to_client_mapper';
import { BallotsService } from '../services/ballots_service';
import { DoubleBallots } from '../models/double_ballots';
import { Vote } from '../models/vote';
import { VoteType } from '../enums/vote_type_enum';
import { Observable } from 'rxjs/Observable';

export class BallotsServiceForUnitTest extends BallotsService {                                  
    private currBallots: DoubleBallots = null;
    private ballots: Observable<Object>;

    getNextBallots(): Observable<Object> {
        this.ballots = new Observable(observer => {
            let serverBallots = new ServerToClientMapper().getDummyServerBallots();
            observer.next([serverBallots]);
            observer.complete();
        });
        return this.ballots;                                
    }

    getPreviousBallots(): Observable<Object> {
        this.ballots = new Observable(observer => {
            let serverBallots = new ServerToClientMapper().getDummyServerBallots();            
            observer.next(serverBallots);
            observer.complete();
        });
        
        return this.ballots;
    }

    registerBallots(ballotId: number, index: number): Observable<Object> {
        return new Observable(observer => {
            let firstVote: Vote = 
                new Vote(VoteType.Text, 'test register vote1', 'test register data1', 33);
            let secondVote: Vote = 
                new Vote(VoteType.Text, 'test register vote2', 'test register data2', 66);

            this.currBallots = 
                new DoubleBallots(ballotId, 'test register question',firstVote,
                                                secondVote, false);
            let serverBallots = new ServerToClientMapper().toServerBallots(this.currBallots);            
            observer.next(serverBallots);
            observer.complete();

        })
   }

}