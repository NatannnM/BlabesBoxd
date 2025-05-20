import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, MenuController } from '@ionic/angular';
import { formatPhoneMask, maskitoElement, phoneMask } from 'src/app/core/constants/mask.constants';
import { ApplicationValidators } from 'src/app/core/validators/url.validator';
import { UsuariosService } from '../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss'],
  standalone: false
})
export class UsuariosFormComponent  implements OnInit {
  phoneMask = phoneMask;
  formatPhoneMask = formatPhoneMask;
  maskitoElement = maskitoElement;

  usuariosForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    nickname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    photo: new FormControl('', [Validators.required, ApplicationValidators.urlValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('',[Validators.required, Validators.maxLength(200)]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    phone: new FormControl(''),
    admin: new FormControl([false]),
    
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
        this.usuariosForm.patchValue(usuarios);
      }
    }
  }

  hasError(field: string, error: string) {
    const formControl = this.usuariosForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

  save() {
    let { value } = this.usuariosForm;
    this.usuariosService.save({
      ...value,
      id: this.usuariosId
    });
    this.alertController.create({
        header: 'Cadastro',
        message: 'Cadastro feito com sucesso! Clique em ok.',
        buttons: ['OK'],
      }).then(alert => alert.present());
    this.router.navigate(['/usuarios']);
  }

  ngOnInit() {
    this.usuariosForm.statusChanges.subscribe(status => {
    console.log('Form status:', status);
    console.log('Form value:', this.usuariosForm.value);
    });
  }

}
