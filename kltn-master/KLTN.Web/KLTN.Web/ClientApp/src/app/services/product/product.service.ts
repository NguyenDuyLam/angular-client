import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Http } from '@angular/http';
import { HttpClient } from '../common/http-client';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public disableProduct = true;

  constructor(private client: Http,
    private http: HttpClient
    ) { }

  async getAll() {
    try {
        const res: any = await this.http.get(`/api/Product/GetAll`).toPromise();
        return res.json();
    }
    catch (e) {
        console.log(e);
    }
  }

  async add(model: any) {
    try {
      const res: any = await this.http.post(`/api/Product/Add`, model).toPromise();
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
      const res: any = await this.http.post(`/api/Product/Update`, model).toPromise();
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
      const res: any = await this.http.post(`/api/Product/Delete`, model).toPromise();
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
    const res: any = await this.http.post(`/api/Product/GetById`, model).pipe(
        catchError(this.handleError)
    ).toPromise();
    return res.json();
  }

  async filter(model: any) {
    const res: any = await this.http.post(`/api/Product/Filter`, model).pipe(
        catchError(this.handleError)
    ).toPromise();
    return res.json();
  }

  async getProductForClient(model: any) {
    const res: any = await this.http.post(`/api/Product/GetProductForClient`, model).pipe(
        catchError(this.handleError)
    ).toPromise();
    return res.json();
  }
  
  handleError(error) {
    return throwError(error.json());
  }
}
