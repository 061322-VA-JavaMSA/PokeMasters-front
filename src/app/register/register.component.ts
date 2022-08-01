import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { Role } from '../models/role.enum';
import { Trainer } from '../models/trainer';
import { TrainerService } from '../services/trainer.service';
import { AuthService } from '../services/auth.service';
import { PokemonService } from '../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorInfo = { error: false, message: '' };
  registered = false;
  pick = false;
  trainer: any;
  constructor(private trainerService: TrainerService, private auth: AuthService, private ps: PokemonService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    const { username, password, displayName } = form.value;
    this.trainer = new Trainer(NaN, username, password, displayName, 100, Role.TRAINER)
    this.trainerService.createTrainer(this.trainer)
    .pipe(
      catchError((e) => {
        this.errorInfo.error = true;
        this.errorInfo.message =
          e.status === 409
            ? 'Username already exist'
            : 'Something went wrong';
        return of(e);
      })
    )
    .subscribe(console.log)
    form.resetForm()
    this.registered = true;

  }

  continue() {
    this.auth.login(this.trainer.username, this.trainer.password, false).subscribe();
    this.pick = true;
  }

  chooseStarter(no: number) {
    this.ps.createPokemon(no, 5).subscribe();
    this.router.navigate(['dashboard']);
  }
}
