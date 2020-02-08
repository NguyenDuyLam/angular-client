import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../common/authentication.service';
import StorageHelper from '../common/storage-helper';


@Injectable({
    providedIn: 'root'
  })

export class JwtInterceptor implements HttpInterceptor {

    constructor (private auth: AuthenticationService) {}

    intercept(request : HttpRequest<any>, next : HttpHandler): Observable<HttpEvent<any>> 
    {
        // add authorization header with jwt token if available
        let currentuser = this.auth.isLoggedIn;
        let token = JSON.parse(StorageHelper.getStorageValue(this.auth.key)); 

        if (currentuser && token !== undefined) 
        {
            request = request.clone({
                setHeaders: 
                {
                     Authorization: `Bearer ${token}` 
                    
                }
            });
        }

        return next.handle(request);
    }
}
