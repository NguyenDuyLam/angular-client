import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  achievements: any[] = [
    // {
    //   code: 1,
    //   name: "Lừa rừng",
    //   descripte: "Đạt chuỗi 3 ngày",
    //   image: "/assets/images/fire.png",
    //   percent: 30
    // },
    {
      code: 2,
      name: "Cao nhân",
      descripte: "Đạt 1000 KN",
      image: "/assets/images/fairy-man.png",
      percent: 70
    },
  ];

  achievement: any = {
    code: 2,
      name: "Cao nhân",
      descripte: "Đạt 1000 KN",
      image: "/assets/images/fairy-man.png",
      percent: 70
  }

  constructor() { }

  ngOnInit() {
  }



}
