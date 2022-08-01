import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../models/role.enum';
import { Trainer } from '../models/trainer';
import { TrainerService } from '../services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {
  trainers: Trainer[] = [];

  constructor(private trainerService: TrainerService, private router: Router) { }

  ngOnInit(): void {
    this.getTrainers()
  }

  getTrainers(): void {
    this.trainerService.getTrainers().subscribe(
      trainers => this.trainers = trainers.filter(t => t.role == Role.TRAINER)
    );
  }

  deleteTrainer(id: number): void {
    this.trainerService.deleteTrainerById(id).subscribe(
      _ => {
        this.ngOnInit()
      }
    )
  }

}
