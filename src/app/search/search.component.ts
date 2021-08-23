import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MainComponent } from './../main/main.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends MainComponent implements OnInit {

  @Output() searchSubmit = new EventEmitter<any>();
  SearchText: string = '';

  ngOnInit() {}

  searchPokemon(event: any) {
    event = event.trim().toLowerCase();
    this.searchSubmit.emit(event);
  }
}
