import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  //Thêm vào giỏ hàng
  addToCart(bookId: number, userId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/add`, { book_id: bookId, user_id: userId, quantity });
  }

  //Lấy danh sách sản phẩm trong giỏ hàng
  getCartItems(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart/${userId}`);
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartItem(cartItemId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cart/update`, { cart_item_id: cartItemId, quantity });
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeCartItem(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/remove/${cartItemId}`);
  }

  // Đếm sản phẩm trong giỏ hàng
  getCartItemCount(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart/count/${userId}`);
  }
  
}