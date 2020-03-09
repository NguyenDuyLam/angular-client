import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { MetadataTypeDetailComponent } from '../metadata-type-detail/metadata-type-detail.component';
import { MetadataTypeService } from 'src/app/services/metadataType/metadata-type.service';

@Component({
  selector: 'app-metadata-type-list',
  templateUrl: './metadata-type-list.component.html',
  styleUrls: ['./metadata-type-list.component.css']
})
export class MetadataTypeListComponent implements OnInit {

    tableInfo = {
        loading: false,
        pageIndex: 1,
        total: 0,
        pageSize: 10,
        keyWord: '',
    }

    modelSearch = {
        name: '',
        code: ''
    }

    modelDelete = {
        id: ''
    }

    metadataTypes: any[] = [];

    constructor(
        private modalService: NzModalService,
        private msg?: NzMessageService,
        private metaTypeSv?: MetadataTypeService
    )
    { }

    ngOnInit() {
        this.getList();
    }

    async getList() {
        try {
            this.tableInfo.loading = true;
            const res: any = await  this.metaTypeSv.getAll();
            this.metadataTypes = res;
        }
        catch(e) {
            console.log(e);
        }
        finally {
            this.tableInfo.loading = false;
        }
    }

    edit(model: any = null) {
        const addModal = 'Thêm loại Metadata';
        const editModal = 'Sửa loại Metadata';
        const modal = this.modalService.create({
            nzTitle: model && model.id ? editModal : addModal,
            nzMaskClosable: false,
            nzWidth: 800,
            nzContent: MetadataTypeDetailComponent,
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

    async deleteRow(id: any) {
        try {
            this.modelDelete.id = id;
            var res: any = await this.metaTypeSv.delete(this.modelDelete);
            if(res) {
                this.msg.success('Xóa thành công');
                this.refresh();
            }
        }
        catch(e){
            console.log(e);
        }
    }

    async search() {
        try {
            this.tableInfo.loading = true;
            this.modelSearch.name = this.tableInfo.keyWord.trim().toLowerCase();
            const res = await this.metaTypeSv.findByName(this.modelSearch);
            this.metadataTypes = res;
        }
        catch(e) {
            console.log(e);
        }
        finally {
            this.tableInfo.loading = false;
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

}
