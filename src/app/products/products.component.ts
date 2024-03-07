import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, NgFor, ReactiveFormsModule, ToastrModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  categories: any;
  products: any[] = [];
  selectedproducts: any;
  selectedCategory: any;
  productData: any;
  data: any[] = [];
  productForm: FormGroup | any;
  isedit: boolean = false;
  product!: number;

  constructor(private apiService: ApiService, private toaster: ToastrService) {
    this.data = [];
  }
  ngOnInit(): void {
    this.productForm = new FormGroup({
      product_name: new FormControl(),
      category_id: new FormControl(),
    });
    this.getAllCategories();
    this.getAllProducts();
  }

  getAllProducts() {
    this.apiService.getAllProducts().subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        this.toaster.error('Error Fetching products');
        console.error(error);
      }
    );
  }
  getAllCategories() {
    this.apiService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        this.toaster.error('Error Fetching category');
        console.error('Error fetching Categories', error);
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
        this.toaster.success('Product Created successfully');
        console.log('Category created successfully:', data);
        this.getAllProducts();
      },
      (error) => {
        this.toaster.error('Error Creating products');
        console.error('Error Creating Product', error);
      }
    );
  }

  editProduct(productData: any) {
    this.isedit = true;
    this.productForm.id = productData.product_id;
    this.productForm.setValue({
      product_name: productData.product_name,
      category_id: productData.category.category_id,
    });
  }

  updateProduct(productData: any) {
    this.productForm.id = productData.id;
    this.apiService
      .updateProduct(this.productForm.id, this.productForm.value)
      .subscribe(
        (data) => {
          this.toaster.success('Product Updated successfully');
          console.log('Product updated successfully:', data);
          this.getAllProducts();
        },
        (error) => {
          this.toaster.error('Error Updating Product');
          console.error('Error updating product:', error);
        }
      );
  }
  deleteProduct(id: string) {
    this.apiService.deleteProduct(id).subscribe(
      () => {
        this.toaster.success('Product Deleted successfully');
        console.log('Product deleted successfully');
        this.getAllProducts();
      },
      (error) => {
        this.toaster.error('Error Deleting Product');
        console.error('Error deleting product:', error);
      }
    );
  }
}
