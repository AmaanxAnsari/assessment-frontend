import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { forkJoin } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  productsWithCategories: any[] = [];
  filteredRecords: any[] = [];
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.fetchRecords();
  }

  fetchRecords() {
    forkJoin({
      products: this.apiService.getAllProducts(),
      categories: this.apiService.getAllCategories(),
    }).subscribe((data: any) => {
      this.products = data.products;
      this.categories = data.categories;
      // console.log(this.products);
      // console.log(this.categories);
      this.joinProductsAndCategories();
    });
  }
  joinProductsAndCategories() {
    if (this.products.length > 0 && this.categories.length > 0) {
      this.productsWithCategories = this.products.map((product) => {
        const category = this.categories.find(
          (cat) => cat.category_id === product.category_id
        );
        return { ...product, category };
      });
    }
  }
  getAllProduct() {
    // Assuming this method returns an observable with product data
    this.apiService.getAllProducts().subscribe(
      (response: any) => {
        // Assuming response has category_id
        const { category_id } = response;
        this.fetchRecordsByCategoryId(category_id);
      },
      (error) => {
        console.error('Error fetching all products', error);
      }
    );
  }

  // fetchRecordsByCategoryId(categoryId: number) {
  //   const records = this.productsWithCategories.filter(
  //     (product) => product.category_id === categoryId
  //   );
  //   console.log('Records with category_id:', records);
  // }
  fetchRecordsByCategoryId(categoryId: number) {
    this.filteredRecords = this.productsWithCategories.filter(
      (product) => product.category_id === categoryId
    );
  }
}
