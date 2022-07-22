import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }
  
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(form: NgForm): void {
    const { username, password } = form.value;
    console.log(password)
    this.authService.login(username, password)
    .pipe(
      tap(data => {
        console.log(data)
        this.tokenStorage.saveToken(data['access_token']);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
      }),
      catchError((e =>  {
        this.errorMessage = e.message;
        this.isLoginFailed = true;
        return of(`Error: ${e.message}`)
      }))
    ).subscribe()

    form.reset()
  }

}
