import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  email = '';
  password = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertController: AlertController
  ) { }

  async logar() {
    const { value } = this.loginForm;
    const user = await this.auth.login(value.email, value.password);
    if(user){
      this.router.navigate(['../filmes']);
    } else {
      this.alertController.create({
        header: 'Erro de Login',
        message: 'Email ou senha inválidos!',
        buttons: ['OK'],
      }).then(alert => alert.present());
    }
  }

  hasError(field: string, error: string) {
    const formControl = this.loginForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }


  ngOnInit() {
  }

}
