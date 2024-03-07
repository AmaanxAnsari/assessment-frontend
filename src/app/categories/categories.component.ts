import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, NgFor, ReactiveFormsModule, ToastrModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: any;
  selectedCategory: any;
  categoryData: any;
  data: any[] = [];
  categoryForm: FormGroup | any;
  isedit: boolean = false;
  category!: number;

  constructor(private apiService: ApiService, private toaster: ToastrService) {
    this.data = [];
  }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      category_name: new FormControl(),
    });

    this.getAllCategories();
  }

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

  addCategory() {
    this.isedit = false;
    this.categoryForm.reset();
  }
  createCategory(categoryForm: FormGroup) {
    this.data.push(this.categoryForm.value);
    this.categories = this.categoryForm.value.name;
    this.apiService.createCategory(this.categoryForm.value).subscribe(
      (data) => {
        console.log('Category created successfully:', data);
        this.toaster.success(
          'Category created successfully:',
          data.category_name
        );
        this.getAllCategories();
      },
      (error) => {
        this.toaster.error('Error Creating category');
        console.error('Error Creating Category', error);
      }
    );
  }

  edit(categoryData: any) {
    this.isedit = true;
    this.categoryForm.id = categoryData.category_id;
    this.categoryForm.setValue({
      category_name: categoryData.category_name,
    });
  }

  updateCategory(categoryData: any) {
    this.categoryForm.id = categoryData.id;
    this.apiService
      .updateCategory(this.categoryForm.id, this.categoryForm.value)
      .subscribe(
        (data) => {
          console.log('Category updated successfully:', data);
          this.toaster.success(
            'Category Updated successfully:',
            data.category_name
          );
          this.getAllCategories();
        },
        (error) => {
          this.toaster.error('Error Updating category');
          console.error('Error updating category:', error);
        }
      );
  }

  deleteCategory(id: number) {
    this.apiService.deleteCategory(id).subscribe(
      (res) => {
        this.categories = this.categories.filter(
          (category: { category_id: number }) => category.category_id !== id
        );
        console.log('Category deleted successfully');
        this.toaster.success('Category Deleted successfully');
        this.getAllCategories();
      },
      (error) => {
        this.toaster.error('Error deleting category');

        console.error('Error deleting category:', error);
      }
    );
  }
}
