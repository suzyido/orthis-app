import { Observable } from 'rxjs/Observable';

export interface IBallotsService {
    registerBallots(ballotId: number, index: number): Observable<Object>;
    getNextBallots(): Observable<Object>;
    getPreviousBallots(): Observable<Object>;
}