import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CheckoutState, ShippingInfo, PaymentInfo } from '../interfaces/checkout.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private initialState: CheckoutState = {
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

  private checkoutState = new BehaviorSubject<CheckoutState>(this.initialState);

  constructor() {}

  getCheckoutState(): Observable<CheckoutState> {
    return this.checkoutState.asObservable();
  }

  setCurrentStep(step: number): void {
    this.checkoutState.next({
      ...this.checkoutState.value,
      currentStep: step
    });
  }

  setShippingInfo(shippingInfo: ShippingInfo): void {
    this.checkoutState.next({
      ...this.checkoutState.value,
      shippingInfo
    });
  }

  setPaymentInfo(paymentInfo: PaymentInfo): void {
    this.checkoutState.next({
      ...this.checkoutState.value,
      paymentInfo
    });
  }

  setOrderNotes(notes: string): void {
    this.checkoutState.next({
      ...this.checkoutState.value,
      orderNotes: notes
    });
  }

  resetCheckout(): void {
    this.checkoutState.next(this.initialState);
  }

  // Simula el procesamiento del pago
  processPayment(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simula una tasa de éxito del 90%
        const success = Math.random() < 0.9;
        resolve(success);
      }, 2000);
    });
  }
} 