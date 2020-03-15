import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeAdminComponent } from './pages/page-admin/welcome-admin/welcome-admin/welcome-admin.component';
import { AuthUserListComponent } from './pages/page-admin/auth-users/auth-user-list/auth-user-list.component';
import { MetadataTypeListComponent } from './pages/page-admin/metadata-type/metadata-type-list/metadata-type-list.component';
import { MetadataValueListComponent } from './pages/page-admin/metadata-value/metadata-value-list/metadata-value-list.component';
import { CartListComponent } from './pages/page-admin/carts/cart-list/cart-list.component';
import { ProductListComponent } from './pages/page-admin/products/product-list/product-list.component';
import { PromotionListComponent } from './pages/page-admin/promotions/promotion-list/promotion-list.component';
import { PagesModule } from './pages/page.module';
import { LoginComponent } from './pages/login/login.component';
import { MenuListComponent } from './pages/page-admin/menu/menu-list/menu-list.component';
import { IndexComponent } from './pages/page-client/index/index.component';
import { PhoneComponent } from './pages/page-client/phone/phone.component';
import { CartComponent } from './pages/page-client/cart/cart.component';
import { PayComponent } from './pages/page-client/pay/pay.component';
import { BillListComponent } from './pages/page-admin/bills/bill-list/bill-list.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/index' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    //admin
    { path: 'admin', component: WelcomeAdminComponent , children: [
      { path: 'authUser', component: AuthUserListComponent },
      { path: 'medataType', component: MetadataTypeListComponent },
      { path: 'medataValue', component: MetadataValueListComponent },
      { path: 'menu', component: MenuListComponent },
      { path: 'product', component: ProductListComponent },
      { path: 'promotion', component: PromotionListComponent },
      { path: 'bill', component: BillListComponent },
    ]},
    //client
    { path: 'index', component: IndexComponent, children: [
      { path: ':menuCode/:productCode', component: PhoneComponent },
      { path: 'cart', component: CartComponent },
    ]},

    { path: 'pay', component: PayComponent },

    


    
];

@NgModule({
    imports: [
    PagesModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
