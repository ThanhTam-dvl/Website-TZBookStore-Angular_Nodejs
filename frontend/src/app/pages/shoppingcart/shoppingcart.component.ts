import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartBadgeService } from '../../services/cartbadge.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  books: any[] = [];
  cartItems: any[] = [];
  userId = 1; // Tạm thời giả định ID người dùng

  constructor(
    private cartService: CartService,
    private cartBadgeService: CartBadgeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  // Tiến hành thanh toán
  goToOrder(): void {
    const selectedItems = this.cartItems.filter(item => item.selected);
    const totalAmount = this.calculateTotal();
    
    // Chuyển sang trang Order và truyền dữ liệu giỏ hàng
    this.router.navigate(['/Order'], { 
      state: { 
        items: selectedItems, 
        totalAmount: totalAmount 
      }
    });
  }

  // Tải danh sách sản phẩm trong giỏ hàng
  loadCartItems(): void {
    this.cartService.getCartItems(this.userId).subscribe(
      (data) => {
        this.cartItems = data.map((item: any) => ({
          ...item,
          selected: false, // Mặc định chưa được chọn
        }));

        // Cập nhật số lượng sản phẩm trong giỏ hàng
        const totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        this.cartBadgeService.updateCartCount(totalItems);
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  // Cập nhật số lượng sản phẩm
  updateQuantity(cartItemId: number, quantity: number): void {
    if (quantity < 1) {
      alert('Số lượng phải lớn hơn hoặc bằng 1');
      return;
    }

    this.cartService.updateCartItem(cartItemId, quantity).subscribe(
      () => {
        this.loadCartItems(); // Tải lại giỏ hàng sau khi cập nhật
      },
      (error) => {
        console.error('Error updating cart item quantity:', error);
      }
    );
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeCartItem(cartItemId: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.cartService.removeCartItem(cartItemId).subscribe(
        () => {
          this.loadCartItems(); // Tải lại giỏ hàng sau khi xóa
        },
        (error) => {
          console.error('Error removing cart item:', error);
        }
      );
    }
  }

  // Chọn sản phẩm cần tính tiền
  onItemSelected(item: any, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    item.selected = isChecked;
  }

  // Tính tổng tiền các sản phẩm được chọn
  calculateTotal(): number {
    return this.cartItems
      .filter((item) => item.selected)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
