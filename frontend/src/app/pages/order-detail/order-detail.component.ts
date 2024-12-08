import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order, OrderStatusMap } from '../../interfaces/order.interface';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderDetail: Order = {
    id: 0,
    customer_name: '',
    email: '',
    phone: '',
    address: '',
    status: 'pending',
    items: [],
    total_amount: 0,
    user_id: 0,
    payment_method: '',
    order_notes: ''
  };

  orderStatus: OrderStatusMap = {
    'pending': { width: '25%', text: 'Chờ Xác Nhận', class: 'bg-warning' },
    'processing': { width: '50%', text: 'Đang Xử Lý', class: 'bg-info' },
    'shipping': { width: '75%', text: 'Đang Giao Hàng', class: 'bg-primary' },
    'completed': { width: '100%', text: 'Đã Hoàn Thành', class: 'bg-success' },
    'cancelled': { width: '100%', text: 'Đã Hủy', class: 'bg-danger' }
  };

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.orderService.getOrderDetail(orderId).subscribe(
        (data: Order) => {
          this.orderDetail = data;
        },
        (error) => {
          console.error('Lỗi khi lấy thông tin đơn hàng:', error);
        }
      );
    }
  }

  onCancelOrder(): void {
    if (this.orderDetail.id) {
      this.orderService.cancelOrder(this.orderDetail.id).subscribe(
        () => {
          this.orderDetail.status = 'cancelled';
        },
        (error) => {
          console.error('Lỗi khi hủy đơn hàng:', error);
        }
      );
    }
  }
}
