import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { TrainerService } from './trainer.service';
import { Trainer } from '../models/trainer.model';
import { finalize, Observable, tap } from 'rxjs';

const { apiKey, apiTrainers } = environment

@Injectable({
  providedIn: 'root'
})
export class CatchService {

  private _loading: boolean = false;

  get loading(): boolean {
    return this._loading;
  }

  constructor(
    private http: HttpClient,
    private readonly pokemonService: PokemonCatalogueService,
    private readonly trainerService: TrainerService 
  ) { }

  public addToCatched(pokemonName: string): Observable<Trainer> {
    if (!this.trainerService.trainer) {
      throw new Error("addToCatched: There is no trainer");
    }
    
    const trainer: Trainer = this.trainerService.trainer;
    const pokemon: string = pokemonName;

    if (!pokemon) {
      throw new Error("addToCatched: No pokemon with name " + pokemonName)
    }

    if (this.trainerService.inCatched(pokemonName)) {
      this.trainerService.removeFromCatched(pokemonName);
    } else {
      this.trainerService.addToCatched(pokemonName)
    }

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey
    })

    this._loading = true;

    return this.http.patch<Trainer>(`${apiTrainers}/${trainer.id}`, {
      pokemon: [...trainer.pokemon]
    }, {
      headers
    })
    .pipe(
      tap((updatedTrainer: Trainer) => {
        this.trainerService.trainer = updatedTrainer;
      }),
      finalize(() => {
        this._loading = false;
      })
    )
  }
}
