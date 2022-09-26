import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.css']
})
export class PokemonCataloguePage implements OnInit {

  get pokemons(): Pokemon[]{
    return this.pokemonCatalogoueService.pokemons;
  }

  get loading(): boolean{
    return this.pokemonCatalogoueService.loading;
  }

  get error(): string{
    return this.pokemonCatalogoueService.error;
  }
  
  constructor(
    private readonly pokemonCatalogoueService: PokemonCatalogueService
    ) { }

  ngOnInit(): void {
    this.pokemonCatalogoueService.findAllPokemons();
  }

}
