import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage implements OnInit {

  constructor(private readonly trainerService: TrainerService) { }

  ngOnInit(): void {
  }

  logout(): void {
    const trainer = this.trainerService.trainer;
    if(trainer != undefined)
      this.trainerService.deleteTrainer(trainer);
      window.location.reload();
  }

}
