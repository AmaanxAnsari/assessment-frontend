import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private API_URL = 'http://localhost:3000/api';
  products: any;
  selectedproducts: any;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.http.get(`${this.API_URL}/products`).subscribe(
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
    this.http.get(`${this.API_URL}/products/${id}`).subscribe(
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
    this.http
      .post(`${this.API_URL}/products`, productData)
      .subscribe((data) => {
        console.log('Category created successfully:', data);
        this.getAllProducts();
        console.log(this.products);
      });
  }

  updateProduct(id: string, productData: any) {
    this.http.put(`${this.API_URL}/products/${id}`, productData).subscribe(
      (data) => {
        console.log('Product updated successfully:', data);
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }
  deleteCategory(id: string) {
    this.http.delete(`${this.API_URL}/products/${id}`).subscribe(
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
