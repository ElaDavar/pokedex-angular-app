import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MainComponent } from '../main/main.component';
import { Pokemon } from '../shared/pokemon.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends MainComponent implements OnInit {

  page = 1;
  totalPokemons = 0;
  displayedColumns: string[] = ['name', 'url', 'action'];
  dataSource = new MatTableDataSource<Pokemon>(this.pokemons);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getPokemons();
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
}
