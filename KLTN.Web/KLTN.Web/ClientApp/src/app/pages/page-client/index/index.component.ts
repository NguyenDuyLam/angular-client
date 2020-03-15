import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/common/authentication.service';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu/menu.service';
import { BillDetailService } from 'src/app/services/bill/bill-detail.service';
import { FastBackwardFill } from '@ant-design/icons-angular/icons/public_api';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  userName = '';

  
  nodes: any[] = [];
  menus: any[] = [];
  products: any[] = [];

  achievements: any[] = [
    {
      code: 1,
      name: "Lừa rừng",
      descripte: "Đạt chuỗi 3 ngày",
      image: "/assets/images/fire.png",
      percent: 30
    },
    {
      code: 2,
      name: "Cao nhân",
      descripte: "Đạt 1000 KN",
      image: "/assets/images/fairy-man.png",
      percent: 50
    },
  ];
  selectProduct = '';

  modelFilter_billdetail = {
    authUserId: '',
  }

  modelSearch_product = {
    name: '',
  }

  constructor(
    private authenSv: AuthenticationService,
    private router?: Router,
    private menuSv?: MenuService,
    private billDetailSv?: BillDetailService,
    private productSv?: ProductService,
  ) { }

  ngOnInit() {
    // var check = this.authenSv.isLogin();
    // if (!check) {
    //   this.router.navigate(['/login']);
    // }
    this.userName = this.authenSv.currentUser.name;
    // this.getDataForTree();
    // this.getCart();
    console.log(this.achievements);
  }

  async getDataForTree() {
    try {
      this.nodes = [];
      const res: any = await this.menuSv.getAll();
      this.menus = res;
      this.createTree();
      
    }
    catch(e) {
        console.log(e);
    }
  }

  createTree() {
    this.menus.forEach(item => {
      if(item.parentId === null) {
        this.nodes = [...this.nodes, {title: item.name, key: item.id, code: item.code, level: 0, children: [] }];
        this.addChildren(this.nodes[this.nodes.length - 1]);
      }
    });
  }

  
  addChildren(node: any) {
    this.menus.forEach(item => {
      if(node.key === item.parentId) {
        node.children = [...node.children, {title: item.name, key: item.id , children: [], code: item.code, level: node.level + 1}];
        this.addChildren(node.children[node.children.length - 1]);
      }
    });
    
  }

  logout() {
    this.authenSv.logout();
  }

  async getCart() {
    try {
      if(this.authenSv.currentUser.name) {
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

  test = true;
  search() {
    if(this.productSv.disableProduct === true) {
      this.productSv.disableProduct = false;
      this.getProduct();
    }
    else {
      this.productSv.disableProduct = true;
    }
  }

  async getProduct() {
    try {
      this.modelSearch_product.name = this.selectProduct;
      const res = await this.productSv.filter(this.modelSearch_product);
      this.products = res;
    }
    catch(e) {
      console.log(e);
    } 
  }

}
