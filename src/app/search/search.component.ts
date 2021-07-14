import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MainComponent } from './../main/main.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends MainComponent implements OnInit {

  @Output() searchSubmit = new EventEmitter<any>();

  ngOnInit() {}

  searchPokemon(event: any) {
    const name = new FormData(event.target).get('name');
    this.searchSubmit.emit(name);
  }
}
