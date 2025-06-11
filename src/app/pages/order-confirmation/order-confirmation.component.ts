import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';
import { Order } from '../../shared/interfaces/order.interface';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  order: Order | null = null;
  isLoading = true;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getCurrentOrder().subscribe(order => {
      this.order = order;
      this.isLoading = false;
    });
  }

  getStatusClass(): string {
    if (!this.order) return '';
    
    switch (this.order.status) {
      case 'processing':
        return 'status-processing';
      case 'shipped':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  }

  getFormattedDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  downloadReceipt(): void {
    if (!this.order) return;

    const receiptContent = this.generateReceiptContent();
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = `order-${this.order.orderId}.txt`;
    link.click();
    
    window.URL.revokeObjectURL(url);
  }

  private generateReceiptContent(): string {
    if (!this.order) return '';

    const lines = [
      '=== ORDER RECEIPT ===',
      `Order ID: ${this.order.orderId}`,
      `Date: ${this.getFormattedDate(this.order.orderDate)}`,
      '\nShipping Information:',
      `${this.order.shippingInfo.firstName} ${this.order.shippingInfo.lastName}`,
      this.order.shippingInfo.address,
      `${this.order.shippingInfo.city}, ${this.order.shippingInfo.state} ${this.order.shippingInfo.zipCode}`,
      this.order.shippingInfo.country,
      `Email: ${this.order.shippingInfo.email}`,
      `Phone: ${this.order.shippingInfo.phone}`,
      '\nItems:',
      ...this.order.items.map(item => 
        `${item.product.name} x${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}`
      ),
      '\nPayment Details:',
      `Card: **** **** **** ${this.order.paymentInfo.lastFourDigits}`,
      `Type: ${this.order.paymentInfo.cardType}`,
      '\nOrder Summary:',
      `Subtotal: $${this.order.pricing.subtotal.toFixed(2)}`,
      `Shipping: $${this.order.pricing.shipping.toFixed(2)}`,
      `Tax: $${this.order.pricing.tax.toFixed(2)}`,
      `Total: $${this.order.pricing.total.toFixed(2)}`,
      '\nEstimated Delivery:',
      this.getFormattedDate(this.order.estimatedDelivery),
      '\nThank you for your purchase!'
    ];

    return lines.join('\n');
  }
}
