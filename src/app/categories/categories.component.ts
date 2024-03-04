import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: any;
  selectedCategory: any;
  categoryData: any = {};

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.apiService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
        // console.log(this.categories);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getCategoryById(id: string) {
    this.apiService.getCategoryById(id).subscribe(
      (data) => {
        this.selectedCategory = data;
        console.log(this.selectedCategory);
        console.log('Category by Id Running');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  createCategory() {
    this.apiService.createCategory(this.categoryData).subscribe((data) => {
      console.log('Category created successfully:', data);
      this.getAllCategories();
    });
  }

  updateCategory(id: string, categoryData: any) {
    this.apiService.updateCategory(id, categoryData).subscribe(
      (data) => {
        console.log('Category updated successfully:', data);
      },
      (error) => {
        console.error('Error updating category:', error);
      }
    );
  }
  deleteCategory(id: string) {
    this.apiService.deleteCategory(id).subscribe(
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
