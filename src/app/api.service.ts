// // api.service.ts

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class ApiService {
//   private API_URL = 'http://localhost:3000/api';

//   constructor(private http: HttpClient) {}

//   // Category APIs
//   // getAllCategories(): Observable<any> {
//   //   return this.http.get(`${this.API_URL}/categories`);
//   // }

//   // getCategoryById(id: string): Observable<any> {
//   //   return this.http.get(`${this.API_URL}/categories/${id}`);
//   // }

//   // createCategory(body: any): Observable<any> {
//   //   return this.http.post(`${this.API_URL}/categories`, body);
//   // }

//   // updateCategory(id: string, body: any): Observable<any> {
//   //   return this.http.put(`${this.API_URL}/categories/${id}`, body);
//   // }

//   // deleteCategory(id: string): Observable<any> {
//   //   return this.http.delete(`${this.API_URL}/categories/${id}`);
//   // }

//   // Product APIs
//   //   getAllProducts(): Observable<any> {
//   //     return this.http.get(`${this.API_URL}/products`);
//   //   }

//   //   getProductById(id: string): Observable<any> {
//   //     return this.http.get(`${this.API_URL}/products/${id}`);
//   //   }

//   //   createProduct(body: any): Observable<any> {
//   //     return this.http.post(`${this.API_URL}/products`, body);
//   //   }

//   //   updateProduct(id: string, body: any): Observable<any> {
//   //     return this.http.put(`${this.API_URL}/products/${id}`, body);
//   //   }

//   //   deleteProduct(id: string): Observable<any> {
//   //     return this.http.delete(`${this.API_URL}/products/${id}`);
//   //   }
//   // }
//   // apiGet(url: string): Observable<any> {
//   //   return this.http.get(url);
//   // }

//   // apiPost(url: string, body: any): Observable<any> {
//   //   return this.http.post(url, body);
//   // }

//   // apiPut(url: string, body: any): Observable<any> {
//   //   return this.http.put(url, body);
//   // }

//   // apiDelete(url: string): Observable<any> {
//   //   return this.http.delete(url);
// }
