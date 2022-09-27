import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { CatchService } from 'src/app/services/catch.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-catch-button',
  templateUrl: './catch-button.component.html',
  styleUrls: ['./catch-button.component.css']
})
export class CatchButtonComponent implements OnInit {

  public isCatched: boolean = false;
  @Input() pokemonName: string = "";

  get loading(): boolean {
    return this.catchService.loading;
  }

  constructor(
    private trainerService: TrainerService,
    private readonly catchService: CatchService
  ) { }

  ngOnInit(): void {
    this.isCatched = this.trainerService.inCatched(this.pokemonName);
  }

  onCatchClick(): void {
    this.catchService.addToCatched(this.pokemonName)
      .subscribe({
        next: (trainer: Trainer) => {
          this.isCatched = this.trainerService.inCatched(this.pokemonName);
        },
        error: (error: HttpErrorResponse) => {
          console.log("ERROR", error.message);
          
        }
      })
  }
}
