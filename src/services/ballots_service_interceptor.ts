import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { DoubleBallots } from "../models/double_ballots";

@Injectable()
export class BallotsServiceInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<DoubleBallots>, next: HttpHandler) {
        const newRequest = req.clone({
            withCredentials: true
        });
//        console.log('In Interceptor');
//        console.log(newRequest);
//        console.log(newRequest.body);

        return next.handle(newRequest);
    }
}