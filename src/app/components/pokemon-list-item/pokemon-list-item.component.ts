import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent implements OnInit {

  @Input() pokemon?: Pokemon;

  constructor() { }

  ngOnInit(): void {
  }

  getPokemonSprite(){
    let spriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+ this.pokemon?.url.replace(/[^0-9]/g, '').replace("2", "") +".png"
    return spriteUrl;
  }

}
