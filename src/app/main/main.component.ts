import { Component, OnInit } from '@angular/core';
import { PokemonService } from "../shared/pokemon.service";
import { Pokemon } from "../shared/pokemon.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  pokemons: any;

  constructor(protected pokemonService: PokemonService) {
    this.pokemonService = pokemonService;
  }

  ngOnInit() {}

  getPokemons(offset: number) {
    this.pokemonService.getPokemons(offset).subscribe((data: Pokemon[]) => {
      this.pokemons = (<any>data)["results"];
    });
  }
}
