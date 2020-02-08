import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { PromotionDetailComponent } from '../promotion-detail/promotion-detail.component';
import { PromotionService } from 'src/app/services/promotion/promotion.service';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.css']
})
export class PromotionListComponent implements OnInit {

    tableInfo = {
        loading: false,
        pageIndex: 1,
        total: 0,
        pageSize: 10,
        keyWord: '',
    }

    status = false;

    modelSearch = {
        name: ''
    }

    modelDelete = {
        id: ''
    }

    promotions: any[] = [];

    constructor(
        private modalService: NzModalService,
        private msg?: NzMessageService,
        private promotionSv?: PromotionService
    ) { }

    ngOnInit() {
        this.getList();
    }

    edit(model: any = null) {
        const addModal = 'Thêm khuyến mãi';
        const editModal = 'Sửa khuyến mãi';
        const modal = this.modalService.create({
            nzTitle: model && model.id ? editModal : addModal,
            nzMaskClosable: false,
            nzWidth: 800,
            nzContent: PromotionDetailComponent,
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
            this.getList();
        });
    }

    async getList() {
        try {
            this.tableInfo.loading = true;
            const res: any = await this.promotionSv.getAll();
            this.promotions = res;
        }
        catch(e) {
            console.log(e);
        }
        finally {
            this.tableInfo.loading = false;
        }
    }

    async deleteRow(id: any) {
        try {
            this.modelDelete.id = id;
            var res: any = await this.promotionSv.delete(this.modelDelete);
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
            if(this.modelSearch && this.status === true) {
                const res = await this.promotionSv.filter(this.modelSearch);
                this.promotions = res;
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

}
