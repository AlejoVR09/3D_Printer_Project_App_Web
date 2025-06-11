import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CheckoutService } from '../../shared/services/checkout.service';
import { CartService } from '../../shared/services/cart.service';
import { OrderService } from '../../shared/services/order.service';
import { Cart } from '../../shared/interfaces/cart.interface';
import { CheckoutState, ShippingInfo, PaymentInfo } from '../../shared/interfaces/checkout.interface';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: Cart = {
    items: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
  };

  checkoutState: CheckoutState = {
    currentStep: 1,
    shippingInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    paymentInfo: {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: ''
    }
  };

  isProcessing = false;
  error: string | null = null;

  constructor(
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
      if (cart.items.length === 0) {
        this.router.navigate(['/cart']);
      }
    });

    this.checkoutService.getCheckoutState().subscribe(state => {
      this.checkoutState = state;
    });
  }

  onShippingSubmit(shippingInfo: ShippingInfo): void {
    this.checkoutService.setShippingInfo(shippingInfo);
    this.nextStep();
  }

  onPaymentSubmit(paymentInfo: PaymentInfo): void {
    this.checkoutService.setPaymentInfo(paymentInfo);
    this.nextStep();
  }

  async onConfirmOrder(): Promise<void> {
    this.isProcessing = true;
    this.error = null;

    try {
      const success = await this.checkoutService.processPayment();
      
      if (success) {
        // Crea la orden
        const order = this.orderService.createOrder(this.cart, this.checkoutState);
        
        // Limpia el carrito
        this.cartService.clearCart();
        
        // Reinicia el estado del checkout
        this.checkoutService.resetCheckout();
        
        // Redirige a la página de confirmación
        this.router.navigate(['/order-confirmation']);
      } else {
        this.error = 'Payment processing failed. Please try again.';
      }
    } catch (err) {
      this.error = 'An unexpected error occurred. Please try again.';
    } finally {
      this.isProcessing = false;
    }
  }

  nextStep(): void {
    this.checkoutService.setCurrentStep(this.checkoutState.currentStep + 1);
  }

  previousStep(): void {
    if (this.checkoutState.currentStep > 1) {
      this.checkoutService.setCurrentStep(this.checkoutState.currentStep - 1);
    }
  }

  formatCardNumber(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    value = value.replace(/(.{4})/g, '$1 ').trim();
    event.target.value = value;
  }

  formatExpiryDate(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    event.target.value = value;
  }

  validateCVV(event: any): void {
    event.target.value = event.target.value.replace(/\D/g, '').substring(0, 3);
  }
}
