import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css'
})
export class TopNavComponent {

  searchText: string = '';
  @Output() search = new EventEmitter<string>();
  constructor(private _router: Router, private dataService: DataService) {}

  performSearch(searchText: string): void {
    // Emit the search event with the query'
    if(this.searchText){
      this.search.emit(searchText);
    }else{
      this._router.navigate(['/']);
    }
    
  }
}
