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
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-filmes-form',
  templateUrl: './filmes-form.component.html',
  styleUrls: ['./filmes-form.component.scss'],
  standalone: false
})
export class FilmesFormComponent implements OnInit {
  dateMask = dateMask;
  maskitoElement = maskitoElement;
  diretores: Diretor[] = [];
  estudios: Estudios[] = [];

  genre = [
    'Ação',
    'Aventura',
    'Comédia',
    'Drama',
    'Ficção Científica',
    'Guerra',
    'Mistério',
    'Musical',
    'Policial',
    'Romance',
    'Suspense',
    'Terror',
  ];

  filmesForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
    image: new FormControl('', [Validators.required, ApplicationValidators.urlValidator]),
    launchDate: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required),
    director: new FormControl('', Validators.required),
    estudios: new FormControl('', Validators.required)
  });

  filmesId!: number;

  constructor(
    private filmesService: FilmesService,
    private diretorService: DiretorService,
    private estudiosService: EstudiosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) {
    this.loadDiretores();
    this.loadEstudios();
    this.filmesId = parseInt(this.activatedRoute.snapshot.params['filmesId']);
    if (this.filmesId) {
      const filme = this.filmesService.getById(this.filmesId);
      if (filme) {
        const launchDate = filme.launchDate instanceof Date ? 
          formatDateMask(filme.launchDate) : 
          filme.launchDate;
          
        this.filmesForm.patchValue({
          title: filme.title,
          image: filme.image,
          launchDate: launchDate,
          genre: filme.genre,
          director: filme.director,
          estudios: filme.estudios
        });
      }
    }}

  ngOnInit() { }

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
    });
    this.alertController.create({
        header: 'Cadastro',
        message: 'Cadastro do filme feito com sucesso! Clique em ok.',
        buttons: ['OK'],
      }).then(alert => alert.present());
    this.router.navigate(['/filmes']);
  }

  private loadDiretores() {
    this.diretores = this.diretorService.getList();
  }

  private loadEstudios() {
    this.estudios = this.estudiosService.getList();
  }
}