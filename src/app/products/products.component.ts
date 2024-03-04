import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: any;
  selectedproducts: any;
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.apiService.getAllProducts().subscribe(
      (response) => {
        this.products = response;
        // console.log(this.products);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getProductById(id: string) {
    this.apiService.getProductById(id).subscribe(
      (response) => {
        this.selectedproducts = response;
        console.log(this.selectedproducts);
        console.log('product by Id Running');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  createProduct(productData: any) {
    this.apiService.createProduct(productData).subscribe((data) => {
      console.log('Category created successfully:', data);
      this.getAllProducts();
      console.log(this.products);
    });
  }

  updateProduct(id: string, productData: any) {
    this.apiService.updateCategory(id, productData).subscribe(
      (data) => {
        console.log('Product updated successfully:', data);
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }
  deleteCategory(id: string) {
    this.apiService.deleteProduct(id).subscribe(
      () => {
        console.log('Product deleted successfully');
        this.getAllProducts();
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }
}
