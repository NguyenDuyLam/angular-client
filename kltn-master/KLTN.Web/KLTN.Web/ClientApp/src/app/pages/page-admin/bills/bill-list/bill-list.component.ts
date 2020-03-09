import { Component, OnInit } from '@angular/core';
import { StatusBill } from 'src/app/enum/status-bill.enum';
import { BillDetailService } from 'src/app/services/bill/bill-detail.service';
import { NzModalService } from 'ng-zorro-antd';
import { BillDetailComponent } from '../bill-detail/bill-detail.component';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {

  bills: any[] = [];
  status: any[] = [];

  tableInfo = {
    loading: false,
    pageIndex: 1,
    total: 0,
    pageSize: 10,
    keyWord: '',
  }

  model_bill = {
    StatusBill: ''
  }

  pending = '';
  approved = '';

  selectedStatus = '';

  constructor(
    private billSv? : BillDetailService,
    private modalService?: NzModalService,
  ) { }

  ngOnInit() {
    this.initStatus();
    this.getList();
  }

  initStatus() {
    this.status = [...this.status, {name: 'Chờ Duyệt', value:StatusBill.Pending}, {name: 'Đã Duyệt', value: StatusBill.Approved}];
    this.pending = StatusBill.Pending;
    this.approved = StatusBill.Approved;
  }

  refresh() {
    this.getList();
  }

  async getList() {
    try {
      this.tableInfo.loading = true;
      const res: any = await  this.billSv.getAllBill();
      this.bills = res;
    }
    catch(e) {
      console.log(e);
    }
    finally {
      this.tableInfo.loading = false;
    }
  }

  edit(model: any = null) {
    const modal = this.modalService.create({
        nzTitle: 'Chi Tiết Hóa Đơn',
        nzMaskClosable: false,
        nzWidth: 800,
        nzContent: BillDetailComponent,
        nzComponentParams: {
            params: {
                id: model ? model.id : '',
                approved: this.approved,
            }
        },
        nzFooter: [{
            label: 'Trở về',
            onClick: (component) => {
                component.cancel();
            }
        },
        {
            label: 'Duyệt',
            type: 'primary',
            onClick: (component) => {
                component.approved();
            }
        }]
    });
    modal.afterClose.subscribe((result) => {
        this.refresh();
    });
  }

  async search() {
    try {
      this.model_bill.StatusBill = this.selectedStatus;
      if(this.selectedStatus !== '') {
        const res = await this.billSv.filterBill(this.model_bill);
        this.bills = res;
      }
      else {
        this.getList();
      }
    }
    catch(e) {
      console.log(e);
    }
    finally {
      this.model_bill.StatusBill = '';
    }
  }


}
