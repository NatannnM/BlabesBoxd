import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { formatPhoneMask, maskitoElement, phoneMask } from 'src/app/core/constants/mask.constants';
import { ApplicationValidators } from 'src/app/core/validators/url.validator';
import { UsuariosService } from '../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuarios_FilmesService } from '../services/usuarios_filmes.service';

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
    admin: new FormControl('', [Validators.required])
  });

  usuariosId!: number;
  
  constructor(
    private menuControl: MenuController,
    private usuariosService: UsuariosService,
    private usuarios_filmesService: Usuarios_FilmesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    const usuariosId = this.activatedRoute.snapshot.params['usuariosId'];
    if(usuariosId){
      this.usuariosService.getById(usuariosId).subscribe({
        next: (usuarios) => {
          if(usuarios){
            this.usuariosId = usuariosId;
            if (usuarios.phone) {
              usuarios.phone = formatPhoneMask(usuarios.phone);
            }
            this.usuariosForm.patchValue(usuarios);
          }
        },
        error: (error) => {
          alert('Erro ao carregar o usuário com a id ' + usuariosId);
          console.error(error);
        }
      });
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
    }).subscribe({
      next: () => {
        this.toastController.create({
          message: 'Usuário salvo com sucesso!',
          duration: 3000,
          color: 'success',
          position: 'top'
        }).then(toast => toast.present());
        this.router.navigate(['/usuarios']);
      },
      error: (error) => {
        this.toastController.create({
          message: error.error.message,
          header: 'Erro ao salvar o usuário ' + value.name + '!',
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

  ngOnInit() {
    this.usuariosForm.statusChanges.subscribe(status => {
    console.log('Form status:', status);
    console.log('Form value:', this.usuariosForm.value);
    });
  }

}
