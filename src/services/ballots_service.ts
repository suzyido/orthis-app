import { HttpClient } from '@angular/common/http';
import { DoubleBallots } from '../models/double_ballots';
import { Injectable } from '@angular/core';
import { Vote } from '../models/vote';
import { VoteFactory } from '../mock/vote_factory';
import { IBallotsService } from '../interfaces/i_ballots_service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BallotsService implements IBallotsService {

    constructor(private httpClient: HttpClient) {}

    registerBallots(ballotId: number, index: number): Observable<Object> {
        return null;
    }

    getNextBallots(): Observable<Object> {
      console.log('In BallotsService.getNextBallots');
      const path = "http://localhost:3000/options_group";
      let res = this.httpClient.get(path);
      console.log('After get: ');
      console.log(res);
      return res;
    }

    getPreviousBallots(): Observable<Object> {
        console.log('In BallotsService.getPreviousBallots');
        const path = "http://localhost:8080/api/list/ballot/";
        let res = this.httpClient.get(path);
        console.log('After get: ');
        console.log(res);
        return res;
      }

    getDefaultBallots(): DoubleBallots {
      let vote: Vote = VoteFactory.getNewVote(1, '', '', 0);
      return new DoubleBallots(1, '', vote, vote, false);    
    }
}