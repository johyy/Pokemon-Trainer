import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { CatchService } from 'src/app/services/catch.service';

@Component({
  selector: 'app-catch-button',
  templateUrl: './catch-button.component.html',
  styleUrls: ['./catch-button.component.css']
})
export class CatchButtonComponent implements OnInit {

  @Input() pokemonName: string = "";

  get loading(): boolean {
    return this.catchService.loading;
  }

  constructor(
    private readonly catchService: CatchService
  ) { }

  ngOnInit(): void {
  }

  onCatchClick(): void {
    this.catchService.addToCatched(this.pokemonName)
      .subscribe({
        next: (response: Trainer) => {
          console.log("NEXT", response);
        },
        error: (error: HttpErrorResponse) => {
          console.log("ERROR", error.message);
          
        }
      })
  }
}
