import { Component, OnInit, Input } from '@angular/core';
import { BillDetailService } from 'src/app/services/bill/bill-detail.service';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.css']
})
export class BillDetailComponent implements OnInit {

  @Input() params: any;

  billDetails: any[] =[];

  model =  {
    billId: ''
  }

  model_Update = {
    id: '',
    status: '',
  }
  
  constructor(
    private billdetailSv?: BillDetailService,
    private modal?: NzModalRef,
  ) { }

  ngOnInit() {
    this.getBillDetail();
  }

  async getBillDetail() {
    try {
      this.model.billId = this.params.id;
      const res = await this.billdetailSv.filter(this.model);
      this.billDetails = res;
    }
    catch(e){
      console.log(e)
    }
  }

  cancel() {
    this.modal.destroy();
  }

  async approved() {
    try {
      this.model_Update.id = this.params.id;
      this.model_Update.status = this.params.approved;
      const res = await this.billdetailSv.UpdateBill(this.model_Update);
      if(res) {
        this.modal.destroy();
      }
    }
    catch(e){
      console.log(e)
    }
  }


}
