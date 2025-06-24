import { Component, OnInit } from '@angular/core';  
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateMask, formatDateMask, maskitoElement, parseDateMask } from 'src/app/core/constants/mask.constants';
import { ApplicationValidators } from 'src/app/core/validators/url.validator';
import { DiretorService } from '../services/diretor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
  
@Component({
  selector: 'app-diretor-form',
  templateUrl: './diretor-form.component.html',
  styleUrls: ['./diretor-form.component.scss'],
  standalone: false,
})
export class DiretorFormComponent  implements OnInit {

  dateMask = dateMask;
  maskitoElement = maskitoElement;

  diretorForm: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
    image: new FormControl('', [Validators.required, ApplicationValidators.urlValidator]),
    sobre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(300)]),
    birthDate: new FormControl('', Validators.required),
  });
  diretorId!: string;

  constructor(
    private diretorService: DiretorService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController 
  ) { 
    const diretorId = this.activatedRoute.snapshot.params['diretorId'];
    if(diretorId){
      this.diretorService.getById(diretorId).subscribe({
        next: (diretor) => {
          if(diretor){
            this.diretorId =  diretorId;
            if(diretor.birthDate instanceof Date){
              diretor.birthDate = formatDateMask(diretor.birthDate);
            }
            if(typeof diretor.birthDate === 'string'){
              const parsed = parseDateMask(diretor.birthDate, 'yyyy/mm/dd');
              if(parsed){
                diretor.birthDate = formatDateMask(parsed);
              }
            }
            this.diretorForm.patchValue(diretor);
          }
        },
        error: (error) => {
          alert('Erro ao carregar o diretor com a id ' + diretorId);
          console.error(error);
        }
      });
    }
  }

  ngOnInit() {}

  hasError(field: string, error: string){
    const formControl = this.diretorForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

  save(){
    let { value } = this.diretorForm;
    if(value.birthDate){
      value.birthDate = parseDateMask(value.birthDate);
    }
    this.diretorService.save({
      ...value,
      id: this.diretorId
    }).subscribe({
      next:() => {
        this.toastController.create({
          message: 'Diretor salvo com sucesso!',
          duration: 3000,
          color: 'success',
          position: 'top'
        }).then(toast => toast.present());
        this.router.navigate(['/diretor']);
      },
      error: (error) => {
        this.toastController.create({
          message: error.error.message,
          header: 'Erro ao salvar o diretor ' + value.nome + '!',
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
