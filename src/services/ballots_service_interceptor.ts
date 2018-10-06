import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { DoubleBallots } from "../models/double_ballots";

@Injectable()
export class BallotsServiceInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<DoubleBallots>, next: HttpHandler) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            req = req.clone({
                setHeaders: { 
                    'x-auth': 'afdafddsafafd'
                }
            });
        }
        return next.handle(req);
    }
}