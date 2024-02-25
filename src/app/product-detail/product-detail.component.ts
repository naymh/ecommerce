import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['p1'];
    });
    this.getProductsById(this.id);
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

