import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { skip } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import e from 'express';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  products: any[] = []; // Define and initialize products array
  categories: any[] = []; // Define and initialize products array
  sub: any;
  searchText: any;
  constructor(private dataService: DataService,  private route: ActivatedRoute, private _router: Router) { }
  limit:number = 12;
  skipno:number = 0;
  
  ngOnInit(): void {
      this.getCategories();
      this.getProductList();
  }

  performSearch(text:any){
    this.searchText = text.target.value;
    if(this.searchText){
      this._router.navigate(['products', {p2:  this.searchText  }]);
    }else{
      this._router.navigate(['/']);
    }
    
  }
 
  getProductList() {
    this.dataService.getProducts(this.limit, this.skipno).subscribe(response => {
      response.products.forEach((e: any) => {
        this.products.push(e);
      });
      
      //console.log(this.products);
    });
  }
  getCategories() {
    this.dataService.getCategories().subscribe(response => {
      this.categories = response;
      //console.log(this.categories);
    });
  }

  readMore(){
    this.skipno = this.products.length;
    this.getProductList();
    
  }
  getStarColor(rating: number, starNumber: number): string {
    return rating >= starNumber ? 'gold' : 'gray';
  }

  goto(data:any){
    this._router.navigate(['products', {p1: data }]);
  }
  gotoProductDetail(productId: number) {
    this._router.navigate(['product', {p1: productId }]);
  }

}
