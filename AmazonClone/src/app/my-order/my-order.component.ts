import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-my-order',
  standalone: true,
  imports: [ CommonModule,FormsModule],
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.css'
})
export class MyOrderComponent {
  products: Product[] = [];
  constructor(private router: Router, private productService: ProductService, private userService: UserService) {
    this.loadOrders();
  }

  loadOrders(): void {
    if (this.userService.checkSession()) {
      this.productService.viewOrders().subscribe(
        (orders: Product[]) => {
          this.products = orders;
          console.log('Orders:', this.products);
        },
        error => {
          console.error('Error fetching orders:', error);
          alert('Error fetching orders. Please try again later.');}
      );
    } else {
      alert('Please login first');
      this.router.navigate(['/login']);
    }
  }

  deleteOrder(orderId: number): void {
    if (this.userService.checkSession()) {
      this.productService.delBuyProductById(orderId).subscribe(
        () => {
          alert('Order deleted successfully ');
          this.loadOrders();  
        },
        error => {
          console.error('Error deleting order:', error);
          alert('Error deleting order. Please try again later.');}
      );
    } else {
      alert('Please login first');
      this.router.navigate(['/login']);
    }
  }
}
