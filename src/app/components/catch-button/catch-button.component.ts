import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-catch-button',
  templateUrl: './catch-button.component.html',
  styleUrls: ['./catch-button.component.css']
})
export class CatchButtonComponent implements OnInit {

  @Input() pokemonName: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onCatchClick(): void {
    alert("You catched a pokemon called " + this.pokemonName + "!")
  }

}
