import { Injectable } from '@angular/core';
import { Http, Headers, ResponseType, ResponseContentType } from '@angular/http';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class HttpClient {

    constructor(private http: Http, private router: Router, private auth: AuthenticationService) { }

    createAuthorizationHeader(headers: Headers) {
        headers.append('Content-Type', 'application/json');
        console.log(this.auth.currentUser.token);
        headers.append('Authorization', 'Bearer ' +  this.auth.currentUser.token);
    }

    createAuthorizationHeaderForUploading(headers: Headers) {
        headers.append('Authorization', this.auth.token);
    }

    get(url: string) {
        if (!this.auth.isLoggedIn) {
            this.redirectToLoginPage();
        }
        const headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers,
        });

    }

    post(url: string, data: any) {
        if (!this.auth.isLoggedIn) {
            this.redirectToLoginPage();
        }
        const headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(url, data, {
            headers: headers,
        });
    }

    put(url: string, data: any) {
        if (!this.auth.isLoggedIn) {
            this.redirectToLoginPage();
        }
        const headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.put(url, data, {
            headers: headers,
        });
    }

    upload(url: string, data: any) {
        if (!this.auth.isLoggedIn) {
            this.redirectToLoginPage();
        }
        const headers = new Headers();
        this.createAuthorizationHeaderForUploading(headers);
        return this.http.post(url, data, {
            headers: headers,
        });
    }

    delete(url: string) {
        if (!this.auth.isLoggedIn) {
            this.redirectToLoginPage();
        }
        const headers = new Headers();
        this.createAuthorizationHeaderForUploading(headers);
        return this.http.delete(url, {
            headers: headers,
        });
    }

    redirectToLoginPage() {
        this.router.navigate(['/login']);
    }
}
