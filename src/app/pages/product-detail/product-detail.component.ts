import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product = {
    id: '1',
    name: 'Modern Geometric Vase',
    description: 'A beautiful geometric vase perfect for modern home decor. This elegant piece combines contemporary design with practical functionality. The geometric patterns create interesting light and shadow effects, making it a stunning centerpiece for any room.',
    price: 29.99,
    imageUrl: 'assets/images/products/vase.jpg',
    category: 'Home Decor',
    inStock: true,
    dimensions: {
      height: 25,
      width: 15,
      depth: 15
    },
    material: 'Premium PLA',
    careInstructions: 'Clean with a soft, damp cloth. Avoid direct sunlight and extreme temperatures.',
    rating: 4.5
  };

  selectedQuantity: number = 1;
  selectedColor: string = 'White';
  availableColors: string[] = ['White', 'Black', 'Gray', 'Blue', 'Red'];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      // TODO: Implement product service to fetch product by ID
      console.log('Loading product with ID:', productId);
    });
  }

  decreaseQuantity(): void {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
    }
  }

  increaseQuantity(): void {
    if (this.selectedQuantity < 10) {
      this.selectedQuantity++;
    }
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  addToCart(): void {
    this.cartService.addItem(this.product, this.selectedQuantity, this.selectedColor);
  }

  addToWishlist(): void {
    console.log('Adding to wishlist:', this.product);
  }
}
