import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = "";
  password = "";
  errorMessage = "";
  error: { name: string, message: string } = {
    name: "",
    message: ""
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    console.log('login entrou');
  }

}
