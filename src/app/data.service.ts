import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { text } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  search(text:any,limit: any,skip:any): Observable<any> {
    return this.http.get('https://dummyjson.com/products/search?q='+text+'&limit='+limit+'&skip='+skip);
  }

  getProducts(limit: any,skip:any): Observable<any> {
    return this.http.get('https://dummyjson.com/products?limit='+limit+'&skip='+skip);
  }

  getProductsByCategory(categories:any): Observable<any> {
    return this.http.get('https://dummyjson.com/products/category/'+categories);
  }

  getProductsById(id:any): Observable<any> {
    return this.http.get('https://dummyjson.com/products/'+id);
  }
  getCategories(): Observable<any> {
    return this.http.get('https://dummyjson.com/products/categories');
  }
  
}
