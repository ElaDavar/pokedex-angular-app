import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends MainComponent implements OnInit {

  @Output() pokemonClicked = new EventEmitter<Event>();
  offset: number = 0;

  ngOnInit(): void {
    this.getPokemons(this.offset);
  }

  onPokemonClick(event: Event): void {
    this.pokemonClicked.emit(event);
  }

  onForwardClick(): void {
    this.offset = this.offset + 10;
    this.getPokemons(this.offset);
  }

  onPreviousClick(): void {
    if (this.offset !== 0) {
      this.offset = this.offset - 10;
      this.getPokemons(this.offset);
    }
  }

}
