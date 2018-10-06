import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { DoubleBallots } from "../models/double_ballots";

@Injectable()
export class BallotsServiceInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<DoubleBallots>, next: HttpHandler) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            req = req.clone({
                setHeaders: { 
                    'x-auth': currentUser
                }
            });
        }
        return next.handle(req);
    }
}