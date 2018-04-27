import { Router } from '@angular/router';
import { ErrorService } from './../../core/error.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private error: ErrorService,
    private router: Router) { }

  ngOnInit() {
  }

  login(username: string, password: string) {
    this.auth.login(username, password)
      .then(() => {
        this.router.navigate(['/lancamentos']);
      })
      .catch(error => {
        console.log(error);
        this.error.handle(error);
      });
  }

}
