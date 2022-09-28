import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})

export class TrainerPage implements OnInit {

  get trainer(): Trainer | undefined {
    return this.trainerService.trainer;
  }

  get catched(): Pokemon[] {
    let pokemonList = [];
    let pokemonStringList = this.catchedString;
    if (this.trainerService.trainer) {
      for (let poke of pokemonStringList) {
        pokemonList.push(this.pokemonService.pokemonByName(poke))
      }

      return pokemonList;
    }
    return [];
  }

  get catchedString(): string[] {
    if (this.trainerService.trainer) {
      return this.trainerService.trainer.pokemon
    }

    return [];
  }

  constructor(
    private readonly pokemonService: PokemonCatalogueService,
    private readonly trainerService: TrainerService
    ) { }

  ngOnInit(): void {
    this.pokemonService.findAllPokemons();
  }

}

