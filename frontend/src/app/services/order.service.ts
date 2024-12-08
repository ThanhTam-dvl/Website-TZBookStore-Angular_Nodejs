import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `http://localhost:5000/api/orders`;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Đã xảy ra lỗi không xác định';
    
    if (error.error instanceof ErrorEvent) {
      // Lỗi phía client
      errorMessage = `Lỗi: ${error.error.message}`;
    } else {
      // Lỗi từ backend
      errorMessage = error.error?.message || 
                    error.message || 
                    `Mã lỗi: ${error.status}, Nội dung: ${error.error}`;
      
      // Log chi tiết lỗi để debug
      console.error('Chi tiết lỗi:', {
        status: error.status,
        statusText: error.statusText,
        url: error.url,
        error: error.error
      });
    }
    
    return throwError(() => new Error(errorMessage));
  }

  createOrder(orderData: Omit<Order, 'id'>): Observable<Order> {
    console.log('Đang gửi dữ liệu đơn hàng:', JSON.stringify(orderData, null, 2));
    return this.http.post<Order>(this.apiUrl, orderData)
      .pipe(
        catchError(this.handleError)
      );
  }

  getOrderDetail(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  cancelOrder(orderId: number): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${orderId}/cancel`, {})
      .pipe(
        catchError(this.handleError)
      );
  }
}
