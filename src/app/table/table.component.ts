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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Pokemon>(this.filteredPokemons);
  breakpoint: number = 0;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 4;
    this.getPokemons();
    this.dataSource.paginator = this.paginator;
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 4;
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

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
