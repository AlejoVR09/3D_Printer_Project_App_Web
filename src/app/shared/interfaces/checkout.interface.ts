export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface CheckoutState {
  currentStep: number;
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  orderNotes?: string;
}

export type CheckoutStep = 'shipping' | 'payment' | 'review' | 'confirmation'; 