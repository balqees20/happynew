import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem("token");

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("x-auth-token", idToken)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}