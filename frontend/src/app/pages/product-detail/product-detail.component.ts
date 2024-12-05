import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CartBadgeService } from '../../services/cartbadge.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  bookId!: number;  // Đánh dấu là chắc chắn được gán giá trị
  book: any = {};
  relatedBooks: any[] = []; // Sách liên quan
  quantity: number = 1;
  userId = 1; // Tạm thời giả định ID người dùng

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private cartBadgeService: CartBadgeService
  ) {}

  ngOnInit(): void {

    const bookId = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getBookById(bookId).subscribe((data) => {
      this.book = data;
    });

    // Lấy id từ URL và ép kiểu sang number
    this.bookId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchBookDetail();
  }

  // Hàm thay đổi số lượng sản phẩm
  changeQuantity(amount: number): void {
    if (this.quantity + amount >= 1) {
      this.quantity += amount;
    }
  }

  // Lấy chi tiết sách từ API
  fetchBookDetail(): void {
    this.productService.getBookById(this.bookId).subscribe(
      (data) => {
        this.book = data;
        this.fetchRelatedBooks(this.book.category_id); // Lấy sách liên quan
      },
      (error) => {
        console.error('Error fetching book detail:', error);
      }
    );
  }

  // Lấy các sách liên quan
  fetchRelatedBooks(categoryId: number): void {
    this.productService.getBooksByCategory(categoryId).subscribe(
      (data) => {
        this.relatedBooks = data;
      },
      (error) => {
        console.error('Error fetching related books:', error);
      }
    );
  }

  // Tăng số lượng sản phẩm
  increaseQuantity(): void {
    if (this.quantity < 10) {  // Giới hạn số lượng tối đa
      this.quantity++;
    }
  }

  // Giảm số lượng sản phẩm
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Hàm thêm sản phẩm vào giỏ hàng
  addToCart(): void {
    this.cartService.addToCart(this.book.book_id, this.userId, this.quantity).subscribe(
      (response) => {
        // Cập nhật số lượng trên nút giỏ hàng
        this.cartBadgeService.incrementCartCount(this.quantity);
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
      },
      (error) => {
        console.error('Error adding to cart:', error);
      }
    );
  }

  // Mở modal hình ảnh
  openImageModal(): void {
    console.log('Open image modal');
  }

  
}
