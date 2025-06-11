import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../interfaces/cart.interface';
import { Product } from '../interfaces/product.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = {
    items: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
  };

  private cartSubject = new BehaviorSubject<Cart>(this.cart);
  private itemCountSubject = new BehaviorSubject<number>(0);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    if (this.isBrowser) {
      // Solo intenta recuperar del localStorage en el navegador
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
        this.updateCart();
      }
    }
  }

  getCart(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getItemCount(): Observable<number> {
    return this.itemCountSubject.asObservable();
  }

  addItem(product: Product, quantity: number = 1, color?: string): void {
    const existingItem = this.cart.items.find(item => 
      item.product.id === product.id && (!color || item.color === color)
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.items.push({
        product,
        quantity,
        color
      });
    }

    this.updateCart();
  }

  removeItem(productId: string, color?: string): void {
    this.cart.items = this.cart.items.filter(item => 
      !(item.product.id === productId && (!color || item.color === color))
    );
    this.updateCart();
  }

  updateItemQuantity(productId: string, quantity: number, color?: string): void {
    const item = this.cart.items.find(item => 
      item.product.id === productId && (!color || item.color === color)
    );
    
    if (item) {
      item.quantity = quantity;
      this.updateCart();
    }
  }

  clearCart(): void {
    this.cart = {
      items: [],
      subtotal: 0,
      shipping: 0,
      tax: 0,
      total: 0
    };
    this.updateCart();
  }

  private updateCart(): void {
    // Calcula el subtotal
    this.cart.subtotal = this.cart.items.reduce(
      (sum, item) => sum + (item.product.price * item.quantity),
      0
    );

    // Calcula el envío (gratis si el subtotal es mayor a $50)
    this.cart.shipping = this.cart.subtotal > 50 ? 0 : 5.99;

    // Calcula los impuestos (10%)
    this.cart.tax = this.cart.subtotal * 0.1;

    // Calcula el total
    this.cart.total = this.cart.subtotal + this.cart.shipping + this.cart.tax;

    // Actualiza el contador de items
    const itemCount = this.cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    // Emite las actualizaciones
    this.cartSubject.next(this.cart);
    this.itemCountSubject.next(itemCount);

    // Solo guarda en localStorage si estamos en el navegador
    if (this.isBrowser) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }
}
