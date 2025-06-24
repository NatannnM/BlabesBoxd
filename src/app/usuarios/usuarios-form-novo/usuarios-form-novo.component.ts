import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController, ToastController, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { ApplicationValidators } from 'src/app/core/validators/url.validator';
import { UsuariosService } from '../services/usuarios.service';
import { formatPhoneMask, maskitoElement, phoneMask } from 'src/app/core/constants/mask.constants';

@Component({
  selector: 'app-usuarios-form-novo',
  templateUrl: './usuarios-form-novo.component.html',
  styleUrls: ['./usuarios-form-novo.component.scss'],
  standalone: false
})
export class UsuariosFormNovoComponent  implements OnInit, ViewWillEnter, ViewWillLeave {
  phoneMask = phoneMask;
  formatPhoneMask = formatPhoneMask;
  maskitoElement = maskitoElement;

  usuariosFormNovo: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    nickname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    photo: new FormControl('', [Validators.required, ApplicationValidators.urlValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('',[Validators.required, Validators.maxLength(200)]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    phone: new FormControl(''),
    admin: new FormControl(false)
  });

  usuariosId!: number;

  constructor(
    private menuControl: MenuController,
    private usuariosService: UsuariosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}
  
  ionViewWillEnter(): void {
    this.menuControl.enable(false);
  }
  ionViewWillLeave(): void {
    this.menuControl.enable(true);
  }

  ngOnInit() {}

  hasError(field: string, error: string) {
    const formControl = this.usuariosFormNovo.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

  save() {
    let { value } = this.usuariosFormNovo;
    this.usuariosService.save({
      ...value,
      id: this.usuariosId
    }).subscribe({
      next: () => {
        this.toastController.create({
          message: 'Usuário criado com sucesso!',
          duration: 3000,
          color: 'success',
          position: 'top'
        }).then(toast => toast.present());
        this.router.navigate(['/filmes']);
      },
      error: (error) => {
        this.toastController.create({
          message: error.error.message,
          header: 'Erro ao criar usuário ' + value.name + '!',
          color: 'danger',
          position: 'top',
          buttons: [
            { text: 'X', role: 'cancel' }
          ]
        }).then(toast => toast.present())
        console.error(error);
      }
    });
  }

}
