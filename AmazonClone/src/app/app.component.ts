import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private router: Router) { }



  loadOrders(): void {
    this.router.navigate(['/my-order']);
  }

  loadProductCart(): void {
    this.router.navigate(['/cart']);
  }

  loadLogin(): void {
    this.router.navigate(['/login']);
  }

  loadHome(): void {
    this.router.navigate(['/home']);
  }

  goBack(): void {
    window.history.back();
  }
}