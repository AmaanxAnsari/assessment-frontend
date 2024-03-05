import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, NgFor, ReactiveFormsModule, ToastrModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  categories: any;
  products: any;
  selectedproducts: any;
  selectedCategory: any;
  productData: any;
  data: any[] = [];
  productForm: FormGroup | any;
  isedit: boolean = false;
  product!: number;

  constructor(private apiService: ApiService) {
    this.data = [];
  }
  ngOnInit(): void {
    this.productForm = new FormGroup({
      product_name: new FormControl(),
      category_id: new FormControl(),
    });
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    this.apiService.getAllProducts().subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  // getCategoryById(id: string) {
  //   this.apiService.getCategoryById(id).subscribe(
  //     (data) => {
  //       this.selectedCategory = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching Category by id', error);
  //     }
  //   );
  // }

  getAllCategories() {
    this.apiService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching all category', error);
      }
    );
  }

  getProductById(id: string) {
    this.apiService.getProductById(id).subscribe(
      (response) => {
        this.selectedproducts = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  addProduct() {
    this.isedit = false;
    this.productForm.reset();
  }
  createProduct(productForm: FormGroup) {
    this.data.push(this.productForm.value);
    this.products = this.productForm.value.name;
    this.apiService.createProduct(this.productForm.value).subscribe(
      (data) => {
        console.log('Category created successfully:', data);
        this.getAllProducts();
        console.log(this.products);
      },
      (error) => {
        console.error('Error Creating Product', error);
      }
    );
  }

  editProduct(productData: any) {
    this.isedit = true;
    this.productForm.id = productData.product_id;
    this.productForm.setValue({
      product_name: productData.product_name,
      category_id: productData.category_id,
    });
  }

  updateProduct(productData: any) {
    this.productForm.id = productData.id;
    this.apiService
      .updateProduct(this.productForm.id, this.productForm.value)
      .subscribe(
        (data) => {
          console.log('Product updated successfully:', data);
          this.getAllProducts();
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
  }
  deleteProduct(id: string) {
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
