import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private API_URL = 'http://localhost:3000/api';
  private API_URL = 'https://assessment-backend-g04j.onrender.com/api';

  constructor(private http: HttpClient) {}

  //Category APIs
  getAllCategories(): Observable<any> {
    return this.http.get(`${this.API_URL}/categories`);
  }

  getCategoryById(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/categories/${id}`);
  }

  createCategory(body: any): Observable<any> {
    return this.http.post(`${this.API_URL}/categories`, body);
  }

  updateCategory(id: string, body: any): Observable<any> {
    return this.http.put(`${this.API_URL}/categories/${id}`, body);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/categories/${id}`);
  }

  // Product APIs
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.API_URL}/products`);
  }

  getPaginatedProducts(params: HttpParams): Observable<any> {
    return this.http.get(`${this.API_URL}/paginated-products`, { params });
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/products/${id}`);
  }

  createProduct(body: any): Observable<any> {
    return this.http.post(`${this.API_URL}/products`, body);
  }

  updateProduct(id: string, body: any): Observable<any> {
    return this.http.put(`${this.API_URL}/products/${id}`, body);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/products/${id}`);
  }
}
