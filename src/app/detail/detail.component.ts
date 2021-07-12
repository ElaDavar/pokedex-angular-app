import { Component, OnInit } from '@angular/core';
import { MainComponent } from './../main/main.component';
import { Pokemon } from "../shared/pokemon.model";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends MainComponent implements OnInit {

  pokemon: any;
  images: Array<String> = [];
  imageIndex: number = 2;

  getPokemon(event: any) {
    this.images = [];
    this.pokemon = this.pokemonService
      .getPokemon(event.url)
      .subscribe((data: Pokemon) => {
        this.pokemon = data;
      });
  }

  getPokemonByName(name: string) {
    this.images = [];
    this.pokemon = this.pokemonService
      .getPokemonByName(name)
      .subscribe((data: Pokemon[]) => {
        this.pokemon = data;
      });
  }

}
