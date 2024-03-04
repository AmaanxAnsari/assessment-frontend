import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  private API_URL = 'http://localhost:3000/api';

  categories: any;
  selectedCategory: any;
  categoryData: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.http.get(`${this.API_URL}/categories`).subscribe(
      (response) => {
        this.categories = response;
        // console.log(this.categories);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getCategoryById(id: string) {
    this.http.get(`${this.API_URL}/categories/${id}`).subscribe(
      (response) => {
        this.selectedCategory = response;
        console.log(this.selectedCategory);
        console.log('Category by Id Running');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // onSubmitAddForm() {
  //   this.createCategory(this.formData);
  //   console.log('FormData', this.formData);
  // }

  createCategory() {
    this.http
      .post(`${this.API_URL}/categories`, this.categoryData)
      .subscribe((data) => {
        console.log('Category created successfully:', data);
        this.getAllCategories();
      });
  }

  updateCategory(id: string, categoryData: any) {
    this.http.put(`${this.API_URL}/categories/${id}`, categoryData).subscribe(
      (data) => {
        console.log('Category updated successfully:', data);
      },
      (error) => {
        console.error('Error updating category:', error);
      }
    );
  }
  deleteCategory(id: string) {
    this.http.delete(`${this.API_URL}/categories/${id}`).subscribe(
      () => {
        console.log('Category deleted successfully');
        this.getAllCategories();
      },
      (error) => {
        console.error('Error deleting category:', error);
      }
    );
  }
}
