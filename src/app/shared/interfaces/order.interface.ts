import { CartItem } from './cart.interface';
import { ShippingInfo, PaymentInfo } from './checkout.interface';

export interface Order {
  orderId: string;
  orderDate: Date;
  items: CartItem[];
  shippingInfo: ShippingInfo;
  paymentInfo: {
    lastFourDigits: string;
    cardType: string;
  };
  pricing: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  status: OrderStatus;
  estimatedDelivery: Date;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'; 