export interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentInfo: PaymentInfo;
  orderDate: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
} 