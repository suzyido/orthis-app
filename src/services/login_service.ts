import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class LoginService {
    constructor(private httpClient: HttpClient) {}

    login(email: string, password: string) : Observable<Object> {
//        console.log('In LoginService.login');
        const path = "http://localhost:3000/users/login";
        
        return this.httpClient.post(path, 
            {email, password}, 
            {
                headers: new HttpHeaders()
                .set('Content-Type', 'application/json'),
                observe: 'response'                                    
            });
//            .map((res: HttpResponse<Object>) => {
//                console.log('Printing the headers', res.headers.get('x-auth'));
//            return res;
        };
//    }
}