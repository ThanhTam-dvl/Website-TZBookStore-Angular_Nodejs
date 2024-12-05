import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Để lấy dữ liệu từ queryParams

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderItems: any[] = [];
  totalAmount: number = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Lấy dữ liệu từ state (dữ liệu truyền từ shopping cart)
    const orderData = history.state;
    if (orderData) {
      this.orderItems = orderData.items;
      this.totalAmount = orderData.totalAmount;
    }
  }
}
