import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from "rxjs/operators";
import { Pokemon } from "./pokemon.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<Pokemon[]>(`${this.apiUrl}`)
      .pipe(catchError(this.handleError));
  }

  getPokemonByName(name: string): Observable<Pokemon[]> {
    return this.http
      .get<Pokemon[]>(`${this.apiUrl}` + name)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error ocurred", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was ${error.error}`
      );
    }
    return throwError("Something bad happened; please try again later.");
  }
}
