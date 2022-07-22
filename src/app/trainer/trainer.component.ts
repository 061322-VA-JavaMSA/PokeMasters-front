import { Component, OnInit } from '@angular/core';
import { Trainer } from '../trainer';
import { TrainerService } from '../trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {
  trainers: Trainer[] = [];
  pokemon: any
  id: number = 0

  constructor(private trainerService: TrainerService) { }

  ngOnInit(): void {
    this.getTrainers()
  }

  getTrainers(): void {
    this.trainerService.getTrainers().subscribe(
      trainers => this.trainers = trainers
    );
  }

  getPokemonById(id: number): void {
    this.trainerService.getPokemonById(id).subscribe(
      pokemon => this.pokemon = pokemon
    )
  }

}
