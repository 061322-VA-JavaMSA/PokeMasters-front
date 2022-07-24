import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Role } from '../models/role.enum';
import { Trainer } from '../models/trainer';
import { TrainerService } from '../services/trainer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private trainerService: TrainerService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    const { username, password, displayName } = form.value;
    let trainer = new Trainer(NaN, username, password, displayName, 100, Role.TRAINER)
    this.trainerService.createTrainer(trainer).subscribe(console.log)
    form.reset()
  }
}
