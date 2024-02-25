import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css'
})
export class TopNavComponent {

  searchText: string = '';

  constructor(private _router: Router) {}

  search() {
    if(this.searchText){
      this._router.navigate(['/'], { queryParams: { search: this.searchText } }).then(() => {
        window.location.reload();
      });
    }else{
      this._router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }
  }
}
