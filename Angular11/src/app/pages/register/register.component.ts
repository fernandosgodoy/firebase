import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
// import { userInfo } from 'os';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email="";
  password="";
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

  register() {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password))
    {
      this.authService.registerWithEmail(this.email, this.password)
        .then((user) => {
        this.authService.authState = user;
        this.errorMessage = "Registrado com sucesso";
        // this.router.navigate(['userInfo']);
      }).catch(e => {
        console.log(e);
        throw e;
      });
    }
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
