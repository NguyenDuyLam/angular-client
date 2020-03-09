import { Component, OnInit } from '@angular/core';
import { BillDetailService } from 'src/app/services/bill/bill-detail.service';
import { AuthenticationService } from 'src/app/services/common/authentication.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts: any[] =[];

  tableInfo = {
    loading: false,
    pageIndex: 1,
    total: 0,
    pageSize: 10,
  }

  model = {
    authUserId: ''
  }

  modelDelete = {
    id: ''
  }

  constructor(
    private billDetailSv?: BillDetailService,
    private authenSv?: AuthenticationService,
    private msg?: NzMessageService,
    private router?: Router,
  ) { }

  ngOnInit() {
    this.getCart();
  }

  async getCart() {
    try {
      if(this.authenSv.currentUser.userId) {
        this.tableInfo.loading = true;
        this.model.authUserId = this.authenSv.currentUser.userId;
        const res: any = await  this.billDetailSv.GetProductForClient(this.model);
        this.carts = res;
        this.authenSv.countCart = res.length;
      }
      else {
        this.authenSv.countCart = 0;
      }
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
      var res: any = await this.billDetailSv.delete(this.modelDelete);
      if(res) {
          this.msg.success('Xóa thành công');
          this.getCart();
      }
    }
    catch(e){
      console.log(e);
    }
  }

  pay() {
    this.router.navigate(['/pay']);
  }

  returnLogin() {
    this.router.navigate(['/login']);
  }


}
