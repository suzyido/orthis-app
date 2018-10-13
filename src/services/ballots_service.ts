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

    postNewBallots(title: string, ballots: any[]) {
      console.log('In post New Ballots with', ballots);
      const path = "http://localhost:3000/options_group";
      const body = {
        'title': title,
        'options': [
          {
            'type': ballots[0].type, 
            'title': ballots[0].title, 
            'data': ballots[0].data
          },{
            'type': ballots[1].type, 
            'title': ballots[1].title, 
            'data': ballots[1].data
          }
        ]
      };
      return this.httpClient.post(path, body);
    }

/*
    login(email: string, password: string) : Observable<Object> {
      const path = "http://localhost:3000/users/login";
      
      return this.httpClient.post(path, 
          {email, password}, 
          {
              headers: new HttpHeaders()
              .set('Content-Type', 'application/json'),
              observe: 'response'                                    
          })
         .map((res: HttpResponse<Object>) => {
              if(res && res.headers && res.headers.get('x-auth')) {
                  localStorage.setItem('currentUser', JSON.stringify(res.headers.get('x-auth')));
//                    console.log('Printing the localStorage currentUser: ', localStorage.getItem('currentUser'));
              }
              return res;
          });
  }

*/

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