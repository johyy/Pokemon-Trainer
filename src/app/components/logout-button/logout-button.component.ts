import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent implements OnInit {

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
