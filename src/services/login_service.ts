import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class LoginService {
    constructor(private httpClient: HttpClient) {}

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
}