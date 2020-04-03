import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService, UploadFile, UploadXHRArgs } from 'ng-zorro-antd';
import { ProductService } from 'src/app/services/product/product.service';
import { MetadataValueService } from 'src/app/services/metadataValue/metadata-value.service';
import { MetadataTypeEnum } from 'src/app/enum/MetadataType.enum';
import { MenuService } from 'src/app/services/menu/menu.service';
import { FileCommonService } from 'src/app/services/common/file-common.service';
import { HttpRequest, HttpEventType, HttpEvent, HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

    @Input() params: any;

    productForm: FormGroup;

    isLoading = false;
    producers: any[] = [];
    productTypes: any[] = [];
    fileList = [];
    nodes: any[] = [];
    menus: any[] = [];
    logos: any = {
        "Logo": {
            filesToUpload: [],
            downloading: false,
            uploading: false,
            image: ''
        }
    }


    modelSearch = {
        name: '',
        field: '',
        id: '',
    }

    constructor(
        private fb: FormBuilder,
        private modal: NzModalRef,
        private msg?: NzMessageService,
        private productSv?: ProductService,
        private metaValueSv?: MetadataValueService,
        private menuSv?: MenuService,
        private fileSv?: FileCommonService,
        private http?: HttpClient
    ) { }

    ngOnInit() {
        this.productForm = this.fb.group({
            id: ['3761607a-a17b-40c8-bfcc-6658fac1ac8d'],
            code: [, [Validators.required]],
            name: [, [Validators.required]],
            producerId: [, [Validators.required]],
            menuId: [, [Validators.required]],
            price: [, [Validators.required]],
            description: [, [Validators.required]],
            isSell: [true],
            logoId: []
        });

        this.getDataProducer();
        this.getDataForTree();
        if(this.params.id !== '') {
            this.getById();
        }
    }

    async getById() {
        try {
            this.modelSearch.id = this.params.id;
            const res = await this.productSv.getById(this.modelSearch);
            this.productForm.patchValue(res);
            this.fileList = [
                {
                  uid: -1,
                  name: this.productForm.controls.logoId.value,
                  status: 'done',
                  url: this.productForm.controls.logoId.value
                }
              ];
        }
        catch (e) {
            console.log(e);
        }
      } 

    save() {
        if (!this.productForm.invalid) {
            if (this.params.id === '') {
                const res = this.productSv.add(this.productForm.value);
                if (res) {
                    this.msg.success('Thêm thành công');
                    this.modal.destroy();
                }
            }
            else {
                const res = this.productSv.update(this.productForm.value);
                if (res) {
                    this.msg.success('Sửa thành công');
                    this.modal.destroy();
                }
            }
        }
        else {
            this.validateData(this.productForm);
        }
    }

    async getDataProducer() {
        try {
            this.modelSearch.field = MetadataTypeEnum.PRODUCER;
            const resProvince = await this.metaValueSv.filter(this.modelSearch);
            this.producers = resProvince;
            this.producers.sort(function(a, b) {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        }
        catch(e) {
            console.log(e);
        }
        finally {
            this.modelSearch.field = '';
        }
    }

    cancel() {
        this.modal.destroy();
    }

    async getDataForTree() {
        try {
          this.nodes = [];
            this.isLoading = true;
            const res: any = await this.menuSv.getAll();
            this.menus = res;
            this.createTree();
            
        }
        catch(e) {
            console.log(e);
        }
        finally {
            this.isLoading = false;
        }
    }

    createTree() {
        this.menus.forEach(item => {
          if(item.parentId === null) {
            this.nodes = [...this.nodes, {title: item.name, key: item.id, expanded: true ,level: 0, checked: true  , children: [] }];
            this.addChildren(this.nodes[this.nodes.length - 1]);
          }
        });
    }
    
      
    addChildren(node: any) {
        this.menus.forEach(item => {
          if(node.key === item.parentId) {
            node.children = [...node.children, {title: item.name, key: item.id , children: [], expanded: true, level: node.level + 1}];
            this.addChildren(node.children[node.children.length - 1]);
          }
        });
    }

    validateData(form: any) {
        for (const i in form.controls) {
            form.controls[i].markAsDirty();
            form.controls[i].updateValueAndValidity();
        }
    }

    showExplain(formControlName: string, errorString?: string) {
        return this.productForm.get(formControlName).dirty && this.productForm.get(formControlName).errors
            && this.productForm.get(formControlName).errors[errorString];
    }

    //image
    showUploadList = {
        showPreviewIcon: true,
        showRemoveIcon: true,
        hidePreviewIconInNonImage: true
    };

    

    previewImage: string | undefined = '';
    previewVisible = false;

    handlePreview = (file: UploadFile) => {
        
        this.previewImage = file.url || file.thumbUrl;
        this.previewVisible = true;
    };

    removeImage = (file: UploadFile) => {
        this.fileList = [];
    }

    //image
    customReq = (item: UploadXHRArgs) => {
        this.productForm.controls.logoId.setValue(item.file.name);
        // Create a FormData here to store files and other parameters.
        const formData = new FormData();
        // tslint:disable-next-line:no-any
        formData.append('file', item.file as any);
        formData.append('id', '1000');
        const req = new HttpRequest('POST', this.fileSv.baseUrlUpload, formData, {
            reportProgress: true,
            withCredentials: true
        });
        // Always returns a `Subscription` object. nz-upload would automatically unsubscribe it at correct time.
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
    };


    //upload file
    //beforeUploadLogo = (file: UploadXHRArgs): boolean => {
    //    return this.beforeUpload(file);
    //};

    //beforeUpload(File: UploadXHRArgs) {
    //    this.file = File;
    //    this.downloadFile = true;
    //    console.log(this.file);
    //    return false;
    //}

    //previewImage: string | undefined = '';
    //downloadFile = false;

    //handlePreview = (file: UploadXHRArgs) => {
    //    this.previewImage = this.fileSv.urlImage + file.name;
        
    //};

    // async handleUpload() {
    //    var res = await  this.fileSv.customReq(this.file);
    //    if (res) {
    //        this.handlePreview(this.file);
    //    }
    //}

    


}
