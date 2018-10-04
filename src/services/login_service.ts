import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class LoginService {
    constructor(private httpClient: HttpClient) {}

    login() : Observable<Object> {
        const user = {
            email: 'suzyido@yahoo.com',
            password: 'password'
        };

        console.log('In LoginService.login');
        const path = "http://localhost:3000/users/login";
        let res = this.httpClient.post(path, user);
        console.log('In LoginService.login.after with: ', res);
        return res;
    }
}