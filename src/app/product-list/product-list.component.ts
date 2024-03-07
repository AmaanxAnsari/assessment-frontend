import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { forkJoin } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, NgFor, NgxPaginationModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  productData: any;
  paginatedProducts: any[] = [];
  pageSize = 5;
  currentPage = 1;
  page = 1;
  totalProducts = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.displayAllProducts();
    this.getPaginatedProducts(this.currentPage, this.pageSize);
  }

  displayAllProducts() {
    this.apiService.getAllProducts().subscribe((data) => {
      this.productData = data;
    });
  }

  getPaginatedProducts(page: number, pageSize: number) {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);
    this.apiService.getPaginatedProducts(params).subscribe((data) => {
      this.paginatedProducts = data.products;
      this.totalProducts = data.totalProducts;
    });
  }
  pageChanged(event: any): void {
    this.currentPage = event;
    this.getPaginatedProducts(this.currentPage, this.pageSize);
  }
}
