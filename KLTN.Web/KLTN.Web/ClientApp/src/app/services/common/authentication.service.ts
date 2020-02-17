import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from "@angular/http";
import StorageHelper from '../common/storage-helper';
import { Router } from "@angular/router";
import { NzNotificationService } from 'ng-zorro-antd';
import * as _ from 'lodash';
import { Observable, observable, Subscriber, BehaviorSubject } from 'rxjs';
import { BillDetailService } from '../bill/bill-detail.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    public token: string;
    public key = 'currentUser';
    public IdUser = '';
    public currentUser: any = { name: '', role: '', userId: '', username: '' };
    public countCart = 0;
    callBack = () => { };

    callBackResolveAuthGuard: any = () => { };
    setResolvePermissionData(callBackResolveAuthGuard: any) {
        this.callBackResolveAuthGuard = callBackResolveAuthGuard;
    }


    hasPermissionData: boolean = false;
    permission = {
        //page_RolePermission: [],
        pages: [],
        //product_RolePermissions: [],
        products: [],
        partners: [],
    }

    constructor(
        private http: Http,
        private router: Router,
        public notification: NzNotificationService,
    ) {
        //this.loggedInUser = JSON.parse(sessionStorage.getItem('currentUser'));
        //if (!this.loggedInUser) {
        //  this.loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
        //}
        //this.token = this.loggedInUser ? this.loggedInUser.token : null;
        //this.currentUser = this.loggedInUser ? this.loggedInUser.userInfo : { email: '', role: Role, userId: '' };
        //this.role = this.currentUser.role;
        const result: any = JSON.parse(StorageHelper.getStorageValue(this.key));
        if (result) {
            this.currentUser = result;
            this.currentUser.token = result.token;
        }
        this.isLogin();
    }

    isLoggedIn() {
        return this.token != null && this.token !== undefined;
    }

    isLogin() {
        const result: any = JSON.parse(StorageHelper.getStorageValue(this.key));
        if (result) {
            this.currentUser = result;
            this.currentUser.token = result.token;
        }
        if (this.currentUser.token) {
            return true
        }
        return false;
    }

    async login(username: string, password: string) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers });
        let model = JSON.stringify({ Username: username, Password: password });
        try {
            const res: any = await this.http.post("/api/User/Login", model, options).toPromise();
            const result = res.json();
            if (result) {
                this.currentUser.role = result.role;
                this.currentUser.name = result.name;
                this.currentUser.userId = result.userId;
                this.currentUser.username = result.username;
                this.token = result.token;
                StorageHelper.setStorageValue('currentUser', JSON.stringify(result));
            }
            return result;

        } catch (ex) {
            return ex;
        }

    }

    getCurrentUser() {
        return this.currentUser;
    }

    logout(reload = false): void {
        // clear token remove user from local storage to log user out
        this.currentUser = null;

        StorageHelper.removeStorageValue('currentUser');

        this.router.navigate(['/login']);
        this.reloadPage(true);
    }

    reloadPage(refreshCache = false) {
        location.reload(refreshCache);
    }
    

}
