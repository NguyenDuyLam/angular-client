import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/common/authentication.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/enum/role.enum';

@Component({
  selector: 'app-welcome-admin',
  templateUrl: './welcome-admin.component.html',
  styleUrls: ['./welcome-admin.component.css']
})
export class WelcomeAdminComponent implements OnInit {

  userName = '';

  constructor(
    private auth: AuthenticationService,
    private router?: Router,
  ) { }

  ngOnInit() {
    // var check = this.auth.isLogin();
    // if (!check) {
    //   this.router.navigate(['/login']);
    // }
    // this.userName = this.auth.currentUser.name;
  }

  logout() {
    this.auth.logout();
  }

}
