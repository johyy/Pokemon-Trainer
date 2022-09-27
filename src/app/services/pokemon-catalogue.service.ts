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
  private _apiDone = false;

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

  public findAllPokemons(): void{
    if(!this._apiDone){
      this._loading = true;
      this.http.get<PokemonAPI>(apiPokemon)
      .pipe(
        map((response: PokemonAPI) => response.results)
      )
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
      ),{
        error: (error: HttpErrorResponse) => {
        }
      }
    }
    this._apiDone = true;
  }

  };
