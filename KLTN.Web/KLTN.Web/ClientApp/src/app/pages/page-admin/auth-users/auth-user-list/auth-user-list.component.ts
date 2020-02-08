import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { AuthUserDetailComponent } from '../auth-user-detail/auth-user-detail.component';
import { AuthUserService } from 'src/app/services/authUser/auth-user.service';
import { MetadataTypeService } from '../../../../services/metadataType/metadata-type.service';
import { MetadataValueService } from '../../../../services/metadataValue/metadata-value.service';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-auth-user-list',
  templateUrl: './auth-user-list.component.html',
  styleUrls: ['./auth-user-list.component.css']
})
export class AuthUserListComponent implements OnInit {

    tableInfo = {
        loading: false,
        pageIndex: 1,
        total: 0,
        pageSize: 10,
        keyWord: '',
    }

    status = false;

    modelSearch = {
        name: '',
        code: '',
    }

    modelDelete = {
        id: ''
    }

    authUsers: any[] = [];

    constructor(
        private modalService: NzModalService,
        private msg?: NzMessageService,
        private authSv?: AuthUserService,
        private metaTypeSv?: MetadataTypeService,
        private metaValueSv?: MetadataValueService
    ) { }

    ngOnInit() {
        this.getList();
    }

    async getList() {
        try {
            this.tableInfo.loading = true;
            const res: any = await  this.authSv.getAll();
            this.authUsers = res;
        }
        catch(e) {
            console.log(e);
        }
        finally {
            this.tableInfo.loading = false;
        }
    }

    edit(model: any = null) {
        const addModal = 'Thêm tài khoản';
        const editModal = 'Sửa tài khoản';
        const modal = this.modalService.create({
            nzTitle: model && model.id ? editModal : addModal,
            nzMaskClosable: false,
            nzWidth: 800,
            nzContent: AuthUserDetailComponent,
            nzComponentParams: {
                params: {
                    id: model ? model.id : '',
                }
            },
            nzFooter: [{
                label: 'Hủy bỏ',
                onClick: (component) => {
                    component.cancel();
                }
            },
            {
                label: 'Lưu',
                type: 'primary',
                onClick: (component) => {
                    component.save();
                }
            }]
        });
        modal.afterClose.subscribe((result) => {
            this.refresh();
        });
    }

    async search() {
        try {
            this.tableInfo.loading = true;
            if(this.tableInfo.keyWord !== '') {
                this.modelSearch.name = this.tableInfo.keyWord.trim().toLowerCase();
                this.status = true;
            }
            if(this.modelSearch && this.status === true) {
                const res = await this.authSv.filter(this.modelSearch);
                this.authUsers = res;
            }
            else {
                this.getList();
            }
        }
        catch(e) {
            console.log(e);
        }
        finally {
            this.tableInfo.loading = false;
            this.modelSearch.name = '';
            this.status = false;
        }
    }

    refresh() {
        if (this.tableInfo.keyWord === '') {
            this.getList(); 
        }
        else {
            this.search();
        }
    }

    async deleteRow(id: any) {
        try {
            this.modelDelete.id = id;
            var res: any = await this.authSv.delete(this.modelDelete);
            if(res) {
                this.msg.success('Xóa thành công');
                this.refresh();
            }
        }
        catch(e){
            console.log(e);
        }
    }

}
