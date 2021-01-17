import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password))
      this.authService.loginWithEmail(this.email, this.password).then(data =>{
        this.authService.authState = data.user;
        this.router.navigate(['userInfo']);
      });
  }

  validateForm(email:string, pass: string){
    if (email.length === 0) {
      this.errorMessage = "Informe o e-mail";
      return false;
    }

    if (pass.length === 0) {
      this.errorMessage = "Informe a senha";
      return false;
    }

    if (pass.length < 6) {
      this.errorMessage = "Senha deve ter no mínimo 6 caracteres.";
      return false;
    }

    this.errorMessage = "";
    return true;
  }

  clearErrorMessage() {
    this.errorMessage = "";
    this.error = {name: "", message: ""}
  }

}
