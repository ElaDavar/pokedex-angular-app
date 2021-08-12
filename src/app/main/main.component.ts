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
  buyList: any;
  wishList: any;

  constructor(
    protected pokemonService: PokemonService,
    public dialog: MatDialog
  ) {
    this.pokemonService = pokemonService;
  }

  ngOnInit() {
    this.getPokemons();
    this.buyList = JSON.parse(localStorage.getItem("buy") as string);
    this.wishList = JSON.parse(localStorage.getItem("wish") as string);
  }

  getPokemons() {
    this.pokemonService.getPokemons().subscribe((data: Pokemon[]) => {
      this.pokemons = (<any>data)['results'];
      this.filteredPokemons = (<any>data)['results'];
    });
  }

  onPokemonClick(event: string): void {
    this.pokemonService.getPokemonByName(event).subscribe((data: Pokemon[]) => {
      this.dialog.open(DialogComponent, {
        width: '300px',
        data,
      });
    });
  }

  search(event: string) {
    if (event) {
      this.filteredPokemons = this.pokemons.filter(
        (item: any) => item.name === event
      );
    } else {
      this.filteredPokemons = this.pokemons;
    }
  }

  buyChange(event: string) {
    this.pokemons.forEach((element: any) => {
      if (element.name === event) {
        if (this.buyList === null) {
          this.buyList = [];
        }
        if (!this.buyList.includes(element.name)) {
          element.buy = true;
          this.buyList.push(element.name);
          localStorage.setItem("buy", JSON.stringify(this.buyList));
          let index = this.wishList.indexOf(element.name);
          this.wishList.splice(index, 1);
        } else {
          element.buy = false;
          let index = this.buyList.indexOf(element.name);
          this.buyList.splice(index, 1);
          localStorage.setItem("buy", JSON.stringify(this.buyList));
        }
      }
    });
  }

  wishChange(event: string) {
    this.pokemons.forEach((element: any) => {
      if (element.name === event) {
        if (this.wishList === null) {
          this.wishList = [];
        }
        if (!this.buyList.includes(element.name)) {
          if (!this.wishList.includes(element.name)) {
            element.wish = true;
            this.wishList.push(element.name);
            localStorage.setItem("wish", JSON.stringify(this.wishList));
          } else {
            element.wish = false;
            let index = this.wishList.indexOf(element.name);
            this.wishList.splice(index, 1);
            localStorage.setItem("wish", JSON.stringify(this.wishList));
          }
        }
      }
    });
  }
}
