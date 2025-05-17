import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateMask, formatDateMask, maskitoElement, parseDateMask } from 'src/app/core/constants/mask.constants';
import { ApplicationValidators } from 'src/app/core/validators/url.validator';
import { FilmesService } from '../services/filmes.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-filmes-form',
  templateUrl: './filmes-form.component.html',
  styleUrls: ['./filmes-form.component.scss'],
  standalone:false
})
export class FilmesFormComponent  implements OnInit {

  dateMask = dateMask;
  maskitoElement = maskitoElement;

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
  ]

  filmesForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
    image: new FormControl('', [Validators.required, ApplicationValidators.urlValidator]),
    launchDate: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required)
  });
  filmesId!: number;

  constructor( 
    private filmesService: FilmesService, 
    private router: Router,
    private activatedRoute: ActivatedRoute, 
  ){
    const filmesId = parseInt(this.activatedRoute.snapshot.params['filmesId'])
    if(filmesId){
      const filmes = this.filmesService.getById(filmesId);
      if(filmes){
        this.filmesId = filmesId;
        if(filmes.launchDate instanceof Date) {
          filmes.launchDate = formatDateMask(filmes.launchDate);
        }
        this.filmesForm.patchValue(filmes);
      }
    }
    
  }

  ngOnInit() { }

  hasError(field: string, error: string){
    const formControl = this.filmesForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

  save(){
    let { value } = this.filmesForm;
    if(value.launchDate){
      value.launchDate = parseDateMask(value.launchDate);
    }
    this.filmesService.save({
      ...value,
      id: this.filmesId
    });
    this.router.navigate(['/filmes']);
  }
}