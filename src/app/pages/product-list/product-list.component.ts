import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [
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
    },
    {
      id: '4',
      name: 'Desktop Organizer',
      description: 'Keep your workspace tidy with this modern organizer.',
      price: 19.99,
      imageUrl: 'assets/images/products/organizer.jpg',
      category: 'Office',
      inStock: true
    },
    {
      id: '5',
      name: 'Plant Pot Set',
      description: 'Set of 3 modern geometric plant pots.',
      price: 34.99,
      imageUrl: 'assets/images/products/plant-pots.jpg',
      category: 'Home Decor',
      inStock: false
    }
  ];

  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  searchQuery: string = '';
  sortOption: string = 'name';
  
  // Tabs configuration
  tabs = [
    { id: 'all', label: 'All Products', icon: 'fas fa-th-large' },
    { id: 'featured', label: 'Featured', icon: 'fas fa-star' },
    { id: 'new', label: 'New Arrivals', icon: 'fas fa-clock' },
    { id: 'sale', label: 'On Sale', icon: 'fas fa-tag' }
  ];
  activeTab: string = 'all';
  
  ngOnInit(): void {
    // Extract unique categories
    this.categories = [...new Set(this.products.map(product => product.category))];
    this.filterProducts();
  }

  filterProducts(): void {
    let filtered = [...this.products];
    
    // Apply tab filter
    switch (this.activeTab) {
      case 'featured':
        filtered = filtered.filter(product => product.id === '1' || product.id === '3'); // Example featured products
        break;
      case 'new':
        filtered = filtered.filter(product => product.id === '4' || product.id === '5'); // Example new arrivals
        break;
      case 'sale':
        filtered = filtered.filter(product => product.id === '2'); // Example sale items
        break;
      default:
        // 'all' tab - no additional filtering
        break;
    }
    
    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }
    
    // Apply search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (this.sortOption) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
    
    this.filteredProducts = filtered;
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
    this.filterProducts();
  }

  getActiveTabLabel(): string {
    const activeTab = this.tabs.find(tab => tab.id === this.activeTab);
    return activeTab ? activeTab.label : 'All Products';
  }

  addToCart(product: Product): void {
    // This will be implemented when we create the cart service
    console.log('Adding to cart:', product);
  }

  addToWishlist(product: Product): void {
    // This will be implemented when we create the wishlist service
    console.log('Adding to wishlist:', product);
  }
}
