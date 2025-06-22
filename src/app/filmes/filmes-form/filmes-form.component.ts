import { Component, OnInit } from '@angular/core';  
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateMask, formatDateMask, maskitoElement, parseDateMask } from 'src/app/core/constants/mask.constants';
import { ApplicationValidators } from 'src/app/core/validators/url.validator';
import { FilmesService } from '../services/filmes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Diretor } from '../../diretor/models/diretor.type';
import { DiretorService } from '../../diretor/services/diretor.service';
import { Estudios } from '../../estudios/models/estudios.type';
import { EstudiosService } from '../../estudios/services/estudios.service';
import { Filmes } from '../models/filmes.type';
import { AlertController, ToastController } from '@ionic/angular';
import { Generos } from '../models/generos.type';
import { GenerosService } from '../services/generos.service';

@Component({
  selector: 'app-filmes-form',
  templateUrl: './filmes-form.component.html',
  styleUrls: ['./filmes-form.component.scss'],
  standalone: false
})
export class FilmesFormComponent implements OnInit {
  dateMask = dateMask;
  maskitoElement = maskitoElement;
  generos: Generos[] = [];  
  diretores: Diretor[] = [];
  estudios: Estudios[] = [];

  filmesForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
    image: new FormControl('', [Validators.required, ApplicationValidators.urlValidator]),
    launchDate: new FormControl('', Validators.required),
    director: new FormControl('', Validators.required),
    estudios: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required),
  });

  filmesId!: number;

  constructor(
    private filmesService: FilmesService,
    private diretorService: DiretorService,
    private estudiosService: EstudiosService,
    private generosService: GenerosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    const filmesId = this.activatedRoute.snapshot.params['filmesId'];
    if(filmesId){
      this.filmesService.getById(filmesId).subscribe({
        next: (filmes) => {
          if(filmes){
            this.filmesId =  filmesId;
            if(filmes.launchDate instanceof Date){
              filmes.launchDate = formatDateMask(filmes.launchDate);
            }
            if(typeof filmes.launchDate === 'string'){
              const parsed = parseDateMask(filmes.launchDate, 'yyyy/mm/dd');
              if(parsed){
                filmes.launchDate = formatDateMask(parsed);
              }
            }
            this.filmesForm.patchValue(filmes);
          }
        },
        error: (error) => {
          alert('Erro ao carregar o filme com a id ' + filmesId);
          console.error(error);
        }
      });
    }
  }

  ngOnInit() { 
    this.generosService.getGeneros().subscribe({
      next: (data) => {
        console.log('generos: ', data);
        this.generos = data;
      },
      error: (error) => {
        alert('Erro ao carregar gênero.');
        console.error(error)
      },
    });

    this.diretorService.getList().subscribe({
      next: (data) => {
        this.diretores = data;
      },
      error: (error) => {
        alert('Erro ao carregar diretor.');
        console.error(error)
      },
    });

    this.estudiosService.getList().subscribe({
      next: (data) => {
        this.estudios = data;
      },
      error: (error) => {
        alert('Erro ao carregar estúdio.');
        console.error(error)
      },
    });
  }

  compareWithGeneros(o1: Generos | null, o2: Generos | null): boolean{
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  compareWithDiretor(o1: Diretor | null, o2: Diretor | null): boolean{
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  compareWithEstudios(o1: Estudios | null, o2: Estudios | null): boolean{
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }


  hasError(field: string, error: string) {
    const formControl = this.filmesForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

  save() {
    let { value } = this.filmesForm;
    if(value.launchDate){
      value.launchDate = parseDateMask(value.launchDate)
    }
    this.filmesService.save({
      ...value,
      id: this.filmesId
    }).subscribe({
      next: () => {
        this.toastController.create({
          message: 'Filme salvo com sucesso!',
          duration: 3000,
          color: 'success',
          position: 'top'
        }).then(toast => toast.present());
        this.router.navigate(['/filmes']);
      },
      error: (error) => {
        this.toastController.create({
          message: error.error.message,
          header: 'Erro ao salvar o filme ' + value.title + '!',
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