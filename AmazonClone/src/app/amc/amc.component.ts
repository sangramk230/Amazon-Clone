import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Product, ProductService } from '../product.service';
import { User, UserService } from '../user.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-amc',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule,CartComponent],
  templateUrl: './amc.component.html',
  styleUrl: './amc.component.css'
})
export class AmcComponent {
  products: Product[] = [];
  user:User[]=[];
    first: boolean= false;
  second: boolean = false;
  mesg:string='';
  constructor(private router:Router,private productService:ProductService,private userService:UserService) {
    this.loadAllProducts();
  }

  profile(): void {
    this.userService.profile().subscribe(
      (res: any) => {
        if (res.length === 0) {
          alert('Please login'); 
          this.router.navigate(['/login']);      
        } else {
          this.user = res; 
          console.log(res); 
          this.second = true; 
        }
      },
      (error) => {
        console.error('Error fetching profile:', error);
        alert('Please login'); 
          this.router.navigate(['/login']); 
      }
    );
  }
  

    loadAllProducts() {
      this.productService.allProduct().subscribe(
        (data: Product[]) => {
          this.products = data;
        }, error => {
          console.error('Error fetching products: ', error);
        }
      );
  }  

  addCart(product: Product) {
    if (this.userService.checkSession()) {
      this.productService.addProductToCart(product).subscribe(
        () => {
          alert('Product added to cart');
          this.router.navigate(['/cart']);
        }, error => {
          console.error('Error adding product to cart: ', error);
          alert('Please login');
          this.router.navigate(['/login']);
        }
      );
    } else {
      alert('Please login');
      this.router.navigate(['/login']);
    }
  }
  
  category(cate: string): void {
    this.productService.viewProductsByCategory(cate).subscribe(
      (products: Product[]) => {
        this.products = products;
        this.mesg = cate; 
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
