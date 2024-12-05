import { Component, OnInit } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartBadgeService } from './services/cartbadge.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  userId = 1; // Tạm thời giả định ID người dùng
  showLayout = true;

  constructor(
    private router: Router,
    private cartService: CartService,
    private cartBadgeService: CartBadgeService,
    private viewportScroller: ViewportScroller  // Dùng để scroll đến vị trí nào đó
  ) { }


  ngOnInit(): void {
    this.router.events.subscribe(() => {
      // Ẩn layout với các đường dẫn cụ thể
      const currentUrl = this.router.url;
      this.showLayout = !(currentUrl === '/Login' || currentUrl === '/Register');
    });

    this.router.events.subscribe((event) => {
      if (event instanceof Scroll) {
        // Cuộn đến đầu trang mỗi khi điều hướng
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });

    this.updateCartCount();
    
  }

  updateCartCount(): void {
    this.cartService.getCartItemCount(this.userId).subscribe(
      (data) => {
        this.cartBadgeService.updateCartCount(data.total_items);
      },
      (error) => {
        console.error('Error fetching cart count:', error);
      }
    );
  }

  title = 'TZBookStore';
}

