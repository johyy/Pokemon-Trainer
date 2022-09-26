import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { PokemonAPI } from '../models/pokemonAPI.model';

const {apiPokemon} = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemons: Pokemon[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  constructor(private readonly http: HttpClient ) { }

  get pokemons(): Pokemon[]{
    return this._pokemons;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }


  //tämä kusee hyvä mies
  public findAllPokemons(): void{
    this._loading = true;
    this.getListOfPokemon()
    .pipe(
      finalize(() => {
        this._loading = false;
      })
    )
    .subscribe(
      (results: Pokemon[]) => {
        for(let r of results) {
          this.pokemons.push(r)
        }
      }
    )
  }

  private getListOfPokemon() {
    return this.http.get<PokemonAPI>(apiPokemon)
      .pipe(
        map((response: PokemonAPI) => response.results)
      );
  }


  };
