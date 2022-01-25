import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  email: string ="";
  password: string="";

  constructor(private userService: UsersService, private router: Router) { }
  ngOnInit(): void {
  }

  login(){
    this.userService.login(this.email,this.password)
    .subscribe( resp => {
      this.userService.setToken(JSON.stringify(resp));
      this.router.navigateByUrl('/servers');
    })
}
}
