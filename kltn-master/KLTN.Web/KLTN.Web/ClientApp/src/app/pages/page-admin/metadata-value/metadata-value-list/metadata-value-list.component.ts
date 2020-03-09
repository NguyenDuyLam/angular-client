import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { MetadataValueDetailComponent } from '../metadata-value-detail/metadata-value-detail.component';
import { MetadataTypeService } from 'src/app/services/metadataType/metadata-type.service';
import { MetadataValueService } from 'src/app/services/metadataValue/metadata-value.service';

@Component({
  selector: 'app-metadata-value-list',
  templateUrl: './metadata-value-list.component.html',
  styleUrls: ['./metadata-value-list.component.css']
})
export class MetadataValueListComponent implements OnInit {

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
        typeId: '',
    }

    modelDelete = {
        id: ''
    }

    metadataValues: any[] = [];
    metadataTypes: any[] = [];

    selectedMetadataType = null;

    constructor(
        private modalService: NzModalService,
        private msg?: NzMessageService,
        private metaTypeSv?: MetadataTypeService,
        private metaValueSv?: MetadataValueService
    ) { }

    ngOnInit() {
        this.getMetadataType();
        this.getList();
    }

    async getList() {
        try {
            this.tableInfo.loading = true;
            const res: any = await  this.metaValueSv.getAll();
            this.metadataValues = res;
        }
        catch(e) {
            console.log(e);
        }
        finally {
            this.tableInfo.loading = false;
        }
    }

    async getMetadataType() {
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
        const addModal = 'Thêm Metadata';
        const editModal = 'Sửa Metadata';
        const modal = this.modalService.create({
            nzTitle: model && model.id ? editModal : addModal,
            nzMaskClosable: false,
            nzWidth: 800,
            nzContent: MetadataValueDetailComponent,
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
            var res: any = await this.metaValueSv.delete(this.modelDelete);
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
            if(this.tableInfo.keyWord !== '') {
                this.modelSearch.name = this.tableInfo.keyWord.trim().toLowerCase();
                this.status = true;
            }
            if(this.selectedMetadataType !== null) {
                this.modelSearch.typeId = this.selectedMetadataType;
                this.status = true;
            }
            if(this.modelSearch && this.status === true) {
                const res = await this.metaValueSv.filter(this.modelSearch);
                this.metadataValues = res;
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
            this.modelSearch.typeId = null;
            this.status = false;
        }
    }


    refresh() {
        if (this.tableInfo.keyWord === '' && this.selectedMetadataType === '') {
            this.getList(); 
        }
        else {
            this.search();
        }
    }



}
