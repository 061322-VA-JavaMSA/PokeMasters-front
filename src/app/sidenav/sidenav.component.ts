import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  canShow() {
    return !(['/', '/login', '/register'].includes(this.router.url))
  }

  getPricipal() {
    return this.authService.getPrincipal()
  }

  getPricipalRole() {
    return this.authService.getPrincipalRole()
  }

}
