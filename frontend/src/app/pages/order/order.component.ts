import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { Order, OrderItem } from '../../interfaces/order.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderData = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: '',
    notes: '',
    user_id: 1,
    items: [] as any[],
    total_amount: 0
  };

  orderItems: any[] = [];
  totalAmount: number = 0;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const orderData = history.state;
    if (orderData) {
      this.orderItems = orderData.items || [];
      this.totalAmount = orderData.totalAmount || 0;
    }
  }

  onConfirmOrder(): void {
    console.log('Starting onConfirmOrder...');
    console.log('Current orderData:', this.orderData);
    console.log('Current orderItems:', this.orderItems);

    if (!this.orderData.fullName || !this.orderData.email || 
        !this.orderData.phone || !this.orderData.address || 
        !this.orderData.paymentMethod) {
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin bắt buộc!';
      console.log('Validation failed:', this.errorMessage);
      return;
    }

    if (!this.orderItems || this.orderItems.length === 0) {
      this.errorMessage = 'Giỏ hàng của bạn đang trống!';
      console.log('Cart is empty');
      return;
    }

    const orderPayload: Omit<Order, 'id'> = {
      user_id: this.orderData.user_id,
      customer_name: this.orderData.fullName,
      email: this.orderData.email,
      phone: this.orderData.phone,
      address: this.orderData.address,
      payment_method: this.orderData.paymentMethod,
      order_notes: this.orderData.notes || '',
      items: this.orderItems.map(item => ({
          book_id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity
      })) as OrderItem[],
      total_amount: this.totalAmount,
      status: 'pending'
    };

    console.log('Sending order payload:', orderPayload);

    this.orderService.createOrder(orderPayload).subscribe({
      next: (response: Order) => {
        console.log('Đơn hàng đã được tạo thành công:', response);
        this.cartService.clearCart();
        
        // Xóa các item trong giỏ hàng
        if (this.orderData.user_id) {
          Promise.all(this.orderItems.map(item => {
            if (item.cart_item_id) {
              return new Promise((resolve) => {
                this.cartService.removeCartItem(item.cart_item_id).subscribe({
                  next: () => resolve(true),
                  error: (err) => {
                    console.error(`Lỗi khi xóa item ${item.cart_item_id}:`, err);
                    resolve(false);
                  }
                });
              });
            }
            return Promise.resolve(true);
          })).then(() => {
            this.router.navigate(['/order-detail', response.id]);
          });
        } else {
          this.router.navigate(['/order-detail', response.id]);
        }
      },
      error: (error) => {
        console.error('Lỗi khi tạo đơn hàng:', error);
        this.errorMessage = error.message || 'Đã có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!';
        
        // Hiển thị thêm thông tin debug nếu cần
        if (error.error) {
          console.error('Chi tiết lỗi:', {
            error: error.error,
            status: error.status,
            message: error.message
          });
        }
      }
    });
  }
}
