import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
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
    admin: new FormControl([false])
  });

  usuariosId!: number;

  constructor(
    private menuControl: MenuController,
    private usuariosService: UsuariosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
  ) { 
    const usuariosId = parseInt(this.activatedRoute.snapshot.params['usuariosId']);
    if (usuariosId) {
      const usuarios = this.usuariosService.getById(usuariosId);
      if (usuarios) {
        this.usuariosId = usuariosId;
        if (usuarios.phone) {
          usuarios.phone = formatPhoneMask(usuarios.phone);
        }
        this.usuariosFormNovo.patchValue(usuarios);
      }
  }}
  
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
    });
    this.alertController.create({
        header: 'Cadastro',
        message: 'Cadastro feito com sucesso! Clique em ok.',
        buttons: ['OK'],
      }).then(alert => alert.present());
    this.router.navigate(['/login']);
  }

}
