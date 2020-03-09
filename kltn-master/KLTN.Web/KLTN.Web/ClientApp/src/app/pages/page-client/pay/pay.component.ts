import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/common/authentication.service';
import { AuthUserService } from 'src/app/services/authUser/auth-user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BillDetailService } from 'src/app/services/bill/bill-detail.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  current = 0;
  userId = '';
  carts: any[] =[];

  modelGetData = {
    id: '',
  }

  user: any;

  tableInfo = {
    loading: false,
    pageIndex: 1,
    total: 0,
    pageSize: 10,
  }

  model = {
    authUserId: '',
    total: 0,
  }

  total = 0;

  constructor(
    private authenSv?: AuthenticationService,
    private userSv?: AuthUserService,
    private billDetailSv?: BillDetailService,
    private router?: Router,
  ) { }

  ngOnInit() {
    this.getUser();
    this.getCart();
  }


  async getUser() {
    try {
        this.modelGetData.id = this.authenSv.currentUser.userId;
        const res = await this.userSv.filter(this.modelGetData);
        console.log(res);
        this.user = res[0];
        console.log(this.user);
    }
    catch (e) {
        console.log(e);
    }
  }

  nextStep() {
    this.current = 1;
  }

  async getCart() {
    try {
      if(this.authenSv.currentUser.userId) {
        this.tableInfo.loading = true;
        this.model.authUserId = this.authenSv.currentUser.userId;
        const res: any = await  this.billDetailSv.GetProductForClient(this.model);
        this.carts = res;
        this.CalcuTotalPrice();
      }
    }
    catch(e) {
      console.log(e);
    }
    finally {
      this.tableInfo.loading = false;
    }
  }

  CalcuTotalPrice() {
    this.carts.forEach(item => {
      this.total += item.priceTotal;
    });
  }

  AddBill() { 
    try {
      this.model.authUserId = this.authenSv.currentUser.userId;
      this.model.total = this.total;
      const res = this.billDetailSv.UpdateStatus(this.model);
      if (res) {
        this.current = 2;
      }
    }
    catch(e) {
      console.log(e);
    }
  }

  backHome() {
    this.router.navigate(['/index']);
  }

}
