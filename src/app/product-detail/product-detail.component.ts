import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  sub: any;
  id : any ;
  product:any;
  quantity: number = 1;
  searchText: any;
  constructor(private dataService: DataService, private route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['p1'];
    });
    this.getProductsById(this.id);
  }

  performSearch(text:any){
    this.searchText = text.target.value;
    if(this.searchText){
      this._router.navigate(['products', {p2:  this.searchText  }]);
    }else{
      this._router.navigate(['/']);
    }
   
  }

  getProductsById(id:any){
    this.dataService.getProductsById(id).subscribe(response => {
      this.product = response;
      //console.log(this.product);
    });
  }

  getStarColor(rating: number, starNumber: number): string {
    return rating >= starNumber ? 'gold' : 'gray';
  }

  changeImg(img:any){
    this.product.thumbnail = img;
  }
}

