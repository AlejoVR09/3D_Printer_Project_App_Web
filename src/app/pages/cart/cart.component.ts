import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { Cart } from '../../shared/interfaces/cart.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
  };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  updateQuantity(productId: string, quantity: number, color?: string): void {
    if (quantity > 0) {
      this.cartService.updateItemQuantity(productId, quantity, color);
    } else {
      this.removeItem(productId, color);
    }
  }

  removeItem(productId: string, color?: string): void {
    this.cartService.removeItem(productId, color);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  proceedToCheckout(): void {
    // TODO: Implementar la navegación al checkout
    console.log('Proceeding to checkout');
  }
}
