import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

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
  
  constructor() { }

  ngOnInit() {
  }

}
