import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  products: any[] = [
    {
      code: 1,
      name: "Gấp đôi hoặc mất hết",
      descripte: "Streak Freeze cho phép bạn giữ nguyên streak trong một ngày bạn không có hoạt động nào",
      image: "/assets/images/product-01.png",
      value: 10
    },
    {
      code: 2,
      name: "Luyện tập có tính thời gian",
      descripte: "Hãy xem bạn tập luyện các kỹ năng tốt tới đâu với đồng hồ trong Thử thách bấm giờ.",
      image: "/assets/images/product-02.png",
      value: 10
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
 