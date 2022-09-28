import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})

export class TrainerPage implements OnInit {

  get trainerName() : string | undefined {
     return this.trainerService.trainer?.username;
  } 

  constructor(private readonly trainerService: TrainerService) { }

  ngOnInit(): void {
  }

}
