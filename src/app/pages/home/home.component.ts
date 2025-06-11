import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [
    {
      id: '1',
      name: 'Modern Geometric Vase',
      description: 'A beautiful geometric vase perfect for modern home decor.',
      price: 29.99,
      imageUrl: 'assets/images/products/vase.jpg',
      category: 'Home Decor',
      inStock: true
    },
    {
      id: '2',
      name: 'Customizable Phone Case',
      description: 'Protect your phone in style with a custom-designed case.',
      price: 24.99,
      imageUrl: 'assets/images/products/phone-case.jpg',
      category: 'Accessories',
      inStock: true
    },
    {
      id: '3',
      name: 'Artistic Figurine',
      description: 'A beautiful figurine to enhance your collection.',
      price: 39.99,
      imageUrl: 'assets/images/products/figurine.jpg',
      category: 'Art',
      inStock: true
    }
  ];

  categories = [
    {
      id: 'home-decor',
      name: 'Home Decor',
      description: 'Beautiful pieces for your home',
      imageUrl: 'assets/images/categories/home-decor.jpg'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      description: 'Personalized accessories for you',
      imageUrl: 'assets/images/categories/accessories.jpg'
    },
    {
      id: 'tech',
      name: 'Tech Gadgets',
      description: 'Innovative tech solutions',
      imageUrl: 'assets/images/categories/tech.jpg'
    },
    {
      id: 'art',
      name: 'Art & Collectibles',
      description: 'Unique artistic creations',
      imageUrl: 'assets/images/categories/art.jpg'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  addToCart(product: Product): void {
    // This will be implemented when we create the cart service
    console.log('Adding to cart:', product);
  }
}
