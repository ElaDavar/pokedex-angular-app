import { Component, OnInit } from '@angular/core';
import { PokemonService } from "../shared/pokemon.service";
import { Pokemon } from "../shared/pokemon.model";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  pokemons: any;
  filteredPokemons: any;

  constructor(
    protected pokemonService: PokemonService,
    public dialog: MatDialog
  ) {
    this.pokemonService = pokemonService;
  }

  ngOnInit() {}

  getPokemons() {
    this.pokemonService.getPokemons().subscribe((data: Pokemon[]) => {
      this.pokemons = (<any>data)['results'];
      this.filteredPokemons = (<any>data)['results'];
    });
  }
}
