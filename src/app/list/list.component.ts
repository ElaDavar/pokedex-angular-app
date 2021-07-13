import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends MainComponent implements OnInit {

  @Output() pokemonClicked = new EventEmitter<Event>();
  page = 1;
  totalPokemons = 0;

  ngOnInit(): void {
    this.getPokemons();
  }

  onPokemonClick(event: Event): void {
    this.pokemonClicked.emit(event);
  }

}
