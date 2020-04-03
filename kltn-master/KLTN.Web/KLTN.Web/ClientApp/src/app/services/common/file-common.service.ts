import { Injectable } from '@angular/core';
import { UploadXHRArgs } from 'ng-zorro-antd';
import { HttpRequest, HttpEventType, HttpResponse, HttpEvent, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FileCommonService {
  
    public baseUrlUpload = '/api/File/UploadFile';
  public urlImage = '../FileUpload/';

  constructor(
    private client: Http,
    private http: HttpClient
    ) { }

  async uploadFile(file: any) {
    try {
        const res: any = await this.client.post(`/api/File/UploadFile`, file).toPromise();
      if (res) {
          return true;
      }
      return false;
    }
    catch (e) {
      console.log(e);
    }
  }

  customReq = (item: UploadXHRArgs) => {
    try {
      // Create a FormData here to store files and other parameters.
      const formData = new FormData();
      // tslint:disable-next-line:no-any
      formData.append('file', item as any);
      formData.append('id', '1000');
      const req = new HttpRequest('POST', this.baseUrlUpload , formData, {
        reportProgress: true,
        withCredentials: true
      });
      return this.http.request(req).subscribe(
        (event: HttpEvent<{}>) => {
            if (event.type === HttpEventType.UploadProgress) {
                if (event.total! > 0) {
                    // tslint:disable-next-line:no-any
                    (event as any).percent = (event.loaded / event.total!) * 100;
                }
                item.onProgress!(event, item.file!);
            } else if (event instanceof HttpResponse) {
                item.onSuccess!(event.body, item.file!, event);
            }
        },
        err => {
            item.onError!(err, item.file!);
        }
    ); 
    }
    catch(e) {
      console.log(e);
    }
  };
}
