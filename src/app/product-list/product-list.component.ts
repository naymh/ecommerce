import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  
  products: any[] = []; // Define and initialize products array
  selectedBrands: { [key: string]: boolean } = {};
  filteredProducts:any[] = []; 
  title : string = "";

  categories: any[] = []; // Define and initialize products array
  sub: any;
  constructor(private dataService: DataService, private route: ActivatedRoute, private _router: Router) { }
  limit:number = 12;
  skipno:number = 0;
  category : any = "smartphones";
  orderBy : any = "1";

  brands: any[] = []; // Define and initialize products array

  isSearch:boolean = false;
  searchText: any;

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.category = params['p1'];
      this.searchText = params['p2'];
    });
    this.products = [];
    this.filteredProducts = [];
    if(this.searchText){
      this.isSearch = true;
      this.search();
    }else if(this.category){
      this.getProductsByCategory();
    }
    // else{
    //   this.isSearch = true;
    //   this.getProductList();
    // }
    
    this.sortBy(1);
  }

  performSearch(text:any){
    this.searchText = text.target.value;
    this.products = [];
    this.filteredProducts = [];
    this.skipno = 0;
    if(this.searchText){
      this.isSearch = true;
      this.search();
    }else if(this.category){
      this.isSearch = false;
      this.getProductsByCategory();
    } 
    // else{
    //   this.isSearch = true;
    //   this.getProductList();
    // }
    
  }
  search(){
    this.title = this.searchText;
    this.dataService.search(this.searchText,this.limit, this.skipno).subscribe(response => {
      response.products.forEach((e: any) => {
        this.products.push(e);
        this.filteredProducts = this.products;
      });
      //console.log(this.products);
    });
  }

  getProductsByCategory(){
    this.title = this.category;
    this.dataService.getProductsByCategory(this.category).subscribe(response => {
      response.products.forEach((e: any) => {
        this.products.push(e);
        this.filteredProducts = this.products;
        //console.log(this.products);
      });
      //console.log(this.products);
    });
  }

  getProductList() {
    this.title = "All products";
    this.dataService.getProducts(this.limit, this.skipno).subscribe(response => {
      response.products.forEach((e: any) => {
        this.products.push(e);
        this.filteredProducts = this.products;
      });
      
      //console.log(this.products);
    });
  }

  getStarColor(rating: number, starNumber: number): string {
    return rating >= starNumber ? 'gold' : 'gray';
  }

  sortBy(id: any) {
    if (id == 1) {
      this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (id == 2) {
      this.filteredProducts.sort((a, b) => a.price - b.price); // Numeric sorting for price
    } else if (id == 3) {
      this.filteredProducts.sort((a, b) => b.price - a.price); // Numeric sorting for rating
    } else if (id == 4) {
      this.filteredProducts.sort((a, b) => b.rating - a.rating); // Numeric sorting for rating
    }
  }

  // Method to filter products based on selected brands
  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
        this.selectedBrands[product.brand]
    );
  }

  // Get unique brands for checkboxes
  get uniqueBrands(): string[] {
      return Array.from(new Set(this.products.map(product => product.brand)));
  }
  
  gotoProductDetail(productId: number) {
    this._router.navigate(['product', {p1: productId }]);
  }

  readMore(){
    this.skipno = this.products.length;
    this.search();
    // if(this.isSearch){
    //   this.skipno = this.products.length;
    //   if(this.title == "All products"){
    //     this.getProductList();
    //   }else{
    //     this.search();
    //   }
    // } 
  }
}
