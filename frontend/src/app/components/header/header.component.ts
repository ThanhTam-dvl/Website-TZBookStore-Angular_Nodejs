import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartBadgeService } from 'src/app/services/cartbadge.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  categories: any[] = [];
  cartCount = 0;
  isProductDetailPage: boolean = false;
  isScrolled = false;

  constructor(
    private http: HttpClient,
    private cartBadgeService: CartBadgeService,
    private router: Router
  ) {}

  
  ngOnInit(): void {
    this.getCategories();
    this.cartBadgeService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });

    this.router.events.subscribe(() => {
      // Kiểm tra xem đang ở trang chi tiết sản phẩm hay không
      this.isProductDetailPage = 
      this.router.url.includes('/product-detail') || 
      this.router.url.includes('/Shoppingcart') || 
      this.router.url.includes('/Order'); 
    });
    
  }

  getCategories() {
    this.http.get<any[]>('http://localhost:5000/api/book-categories').subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Failed to fetch categories', error);
      }
    );
  }
}
