import { Injectable } from '@angular/core';
import { HttpClient } from '../common/http-client';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MetadataTypeService {

    constructor(private client: Http,
        private http: HttpClient
        ) { }

    async getAll() {
        try {
            const res: any = await this.http.get(`/api/MetadataType/GetAll`).toPromise();
            return res.json();
        }
        catch (e) {
            console.log(e);
        }
    }

    async findByName(model: any) {
        try {
            const res: any = await this.http.post(`/api/MetadataType/FindByName`, model).pipe(
                catchError(this.handleError)
            ).toPromise();
            return res.json();
        }
        catch (e) {
            console.log(e);
        }
    }

    async add(model: any) {
        try {
            const res: any = await this.http.post(`/api/MetadataType/Add`, model).toPromise();
            if (res) {
                return true;
            }
            return false;
        }
        catch (e) {
            console.log(e);
        }
    }

    async update(model: any) {
        try {
            const res: any = await this.http.put(`/api/MetadataType/Update`, model).toPromise();
            if (res) {
                return true;
            }
            return false;
        }
        catch (e) {
            console.log(e);
        }
    }

    async delete(model: any) {
        try {
            const res: any = await this.http.post(`/api/MetadataType/Delete`, model).toPromise();
            if (res) {
                return true;
            }
            return false;
        }
        catch (e) {
            console.log(e);
        }
    }

    async getById(model: any) {
        const res: any = await this.http.post(`/api/MetadataType/GetById`, model).pipe(
            catchError(this.handleError)
        ).toPromise();
        return res.json();
    }

    handleError(error) {
        return throwError(error.json());
    }
}
