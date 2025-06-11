import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../interfaces/order.interface';
import { Cart } from '../interfaces/cart.interface';
import { CheckoutState } from '../interfaces/checkout.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private currentOrder = new BehaviorSubject<Order | null>(null);

  constructor() {}

  createOrder(cart: Cart, checkoutState: CheckoutState): Order {
    const now = new Date();
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(now.getDate() + 5); // Estimación de 5 días para la entrega

    const order: Order = {
      orderId: this.generateOrderId(),
      orderDate: now,
      items: [...cart.items],
      shippingInfo: { ...checkoutState.shippingInfo },
      paymentInfo: {
        lastFourDigits: checkoutState.paymentInfo.cardNumber.slice(-4),
        cardType: this.getCardType(checkoutState.paymentInfo.cardNumber)
      },
      pricing: {
        subtotal: cart.subtotal,
        shipping: cart.shipping,
        tax: cart.tax,
        total: cart.total
      },
      status: 'processing',
      estimatedDelivery
    };

    this.currentOrder.next(order);
    this.saveOrder(order);

    return order;
  }

  getCurrentOrder(): Observable<Order | null> {
    return this.currentOrder.asObservable();
  }

  private generateOrderId(): string {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomStr}`.toUpperCase();
  }

  private getCardType(cardNumber: string): string {
    // Implementación básica para detectar el tipo de tarjeta
    const cleanNumber = cardNumber.replace(/\D/g, '');
    if (cleanNumber.startsWith('4')) return 'Visa';
    if (cleanNumber.startsWith('5')) return 'MasterCard';
    if (cleanNumber.startsWith('3')) return 'American Express';
    if (cleanNumber.startsWith('6')) return 'Discover';
    return 'Unknown';
  }

  private saveOrder(order: Order): void {
    // Guarda la orden en localStorage
    const orders = this.getOrders();
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  private getOrders(): Order[] {
    const ordersJson = localStorage.getItem('orders');
    return ordersJson ? JSON.parse(ordersJson) : [];
  }
}
