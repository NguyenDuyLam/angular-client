import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { BillDetailService } from 'src/app/services/bill/bill-detail.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TouchSequence } from 'selenium-webdriver';
import { AuthenticationService } from 'src/app/services/common/authentication.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {

  menuCode = '';
  products: any[] = [];

  modelSearch = {
    menuCode: '',
  }

  modelFilter_billdetail = {
    authUserId: '',
  }

  cartForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private productSv?: ProductService,
    private billDetailSv?: BillDetailService,
    private fb?: FormBuilder,
    private authenSv?: AuthenticationService,
    private msg?: NzMessageService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.menuCode = params.get('productCode');
      this.productSv.disableProduct = true;
      this.getProduct();
      this.initForm();
      this.getCart();
    });
  }

  initForm() {
    this.cartForm = this.fb.group({
      id: ['3761607a-a17b-40c8-bfcc-6658fac1ac8d'],
      ProductId: [],
      Amount: [1],
      PriceTotal: [0],
      AuthUserId: [],
    });
  }

  async getProduct() {
    try {
        this.modelSearch.menuCode = this.menuCode;
      const res = await this.productSv.getProductForClient(this.modelSearch);
      this.products = res;
    }
    catch(e) {
      console.log(e);
    }
  }

  async addCart(productId: any) {
    try {
      if(this.authenSv.currentUser.userId) {
        this.cartForm.controls.ProductId.setValue(productId);
        this.cartForm.controls.AuthUserId.setValue(this.authenSv.currentUser.userId);
        const res = await this.billDetailSv.add(this.cartForm.value);
        if(res) {
          this.getCart();
          this.msg.info("Vui lòng kiểm tra giỏ hàng");
        }
        
      }
      else {
        this.msg.info("Vui lòng đăng nhập để mua hàng");
      }
    }
    catch(e) {
      console.log(e);
    }
    finally {
      this.getCart();
    }
  }

  async getCart() {
    try {
      if(this.authenSv.currentUser.userId) {
        this.modelFilter_billdetail.authUserId = this.authenSv.currentUser.userId
        const res: any = await this.billDetailSv.filter(this.modelFilter_billdetail);
        this.authenSv.countCart = res.length;
      }
      else {
        this.authenSv.countCart = 0;
      }
    }
    catch(e) {
      console.log(e);
    }
  }

  

}
