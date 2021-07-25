import { Component, OnInit } from '@angular/core';
import { PokemonService } from "../shared/pokemon.service";
import { Pokemon } from "../shared/pokemon.model";
import { DialogComponent } from '../dialog/dialog.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  pokemons: any;
  filteredPokemons: any;
  page = "1";
  checked = false;

  constructor(
    protected pokemonService: PokemonService,
    public dialog: MatDialog
  ) {
    this.pokemonService = pokemonService;
  }

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons() {
    this.pokemonService.getPokemons().subscribe((data: Pokemon[]) => {
      this.pokemons = (<any>data)['results'];
      this.filteredPokemons = (<any>data)['results'];
    });
  }

  onPokemonClick(event: any): void {
    this.pokemonService.getPokemonByName(event).subscribe((data: Pokemon[]) => {
      this.dialog.open(DialogComponent, {
        width: '300px',
        data,
      });
    });
  }

  search(event: any) {
    if (event) {
      this.filteredPokemons = this.pokemons.filter(
        (item: any) => item.name === event
      );
    } else {
      this.filteredPokemons = this.pokemons;
    }
  }

  onPageIndexChange(event: number) {
    this.page === event.toString();
  }
}
