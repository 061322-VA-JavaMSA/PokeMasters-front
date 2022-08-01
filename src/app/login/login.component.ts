import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorInfo = { error: false, message: '' };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    const { username, password } = form.value;
    console.log(form);

    this.authService
      .login(username, password, true)
      .pipe(
        catchError((e) => {
          this.errorInfo.error = true;
          this.errorInfo.message =
            e.status === 401
              ? 'Wrong username or password'
              : 'Something went wrong';
          return of(e);
        })
      )
      .subscribe(console.log);

    form.resetForm();
  }
}
