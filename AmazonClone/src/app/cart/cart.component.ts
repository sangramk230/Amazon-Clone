import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  products: Product[] = [];
  selectedProduct: Product = new Product(0, '', '', '', 0, '', '', 0, 1, '');
  first: boolean = true;
  second: boolean = false;
  totalPrice: number = 0;

  constructor(private router: Router, private productService: ProductService, private userService: UserService) {
    this.loadProductCart();
  }

  loadProductCart(): void {
    if (this.userService.checkSession()) {
      this.productService.viewProductCart().subscribe(
        (data: Product[]) => {
          this.products = data;
        },
        error => {
          console.error('Error fetching product cart:', error);
          alert('Please try again later.');
          this.router.navigate(['/login']);
        }
      );
    } else {
      alert('Please try again later.');
      this.router.navigate(['/login']);
    }
  }

  deleteFromCart(productId: number): void {
    if (this.userService.checkSession()) {
      this.productService.delCartProductById(productId).subscribe(
        () => {
          alert('Product removed from cart successfully');
          this.loadProductCart();
        },
        error => {
          console.error('Error removing product from cart:', error);
        }
      );
    } else {
      alert('Please try again later.');
      this.router.navigate(['/login']);
    }
  }

  loadCheckout(product: Product): void {
    this.selectedProduct = product;
    this.first = false;
    this.second = true;
    this.calculateTotalPrice();
  }

  buyProduct(product: Product): void {
    if (this.userService.checkSession()) {
      this.productService.buyProduct(product).subscribe(
        () => {
          alert('Product purchased successfully');
          this.router.navigate(['/my-order']);
        },
        error => {
          alert('Please try again later.');
          this.router.navigate(['/login']);
        }
      );
    } else {
      alert('Please try again later.');
      this.router.navigate(['/login']);
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.selectedProduct.quantity * this.selectedProduct.price;
    this.totalPrice = Math.max(this.totalPrice, 0);
  }
}
