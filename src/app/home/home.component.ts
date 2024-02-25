import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { skip } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(private dataService: DataService,  private route: ActivatedRoute,private _router: Router) { }
  limit:number = 0;
  skipno:number = 0;
  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => {
      this.searchText = params['search'] || '';
    });
    this.getCategories();
    if(this.searchText){
      this.search(this.searchText);
    }else{
      this.getProductList();
    }
  }

  search(text:any){
    this.skipno += this.limit
    this.limit = 12;
    this.dataService.search(text,this.limit, this.skipno).subscribe(response => {
      response.products.forEach((e: any) => {
        this.products.push(e);
      });
      //console.log(this.products);
    });
  }
  getProductList() {
    this.skipno += this.limit
    this.limit = 12;
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
