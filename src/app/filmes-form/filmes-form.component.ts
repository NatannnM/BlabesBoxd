import { Component, OnInit } from '@angular/core';
import { FilmesService } from '../services/filmes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationValidators } from '../core/validators/url.validator';
import { dateMask, formatDateMask, maskitoElement, parseDateMask, priceMask } from '../core/constants/mask.constants';

@Component({
  selector: 'app-filmes-form',
  templateUrl: './filmes-form.component.html',
  styleUrls: ['./filmes-form.component.scss'],
})
export class FilmesFormComponent  implements OnInit {
  dateMask = dateMask;
  priceMask = priceMask;
  maskitoElement = maskitoElement;

  filmesForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required, Validators.minLength(3), Validators.maxLength(150)
    ]),
    image: new FormControl('', [
      Validators.required,
      ApplicationValidators.urlValidator
    ]),
    launchDate: new FormControl(''),
    category: new FormControl('', Validators.required),
    estudio: new FormControl('', Validators.required)
  });
  filmesId!: number;
  //estudio: Estudio[] = []
  constructor(
    private filmesService : FilmesService,
    private router : Router,
    private activatedRoute: ActivatedRoute,
    //private estudioService: EstudioService,
    private toastController: ToastController
  ) { 
    const filmesId = this.activatedRoute.snapshot.params['filmesId'];
    if (filmesId) {
      this.filmesService.getById(filmesId).subscribe({
        next: (filmes) => {
          if (filmes) {
            this.filmesId = filmesId;
            if (filmes.launchDate instanceof Date) {
              filmes.launchDate = formatDateMask(filmes.launchDate);
            }
            if (typeof filmes.launchDate === 'string') {
              filmes.launchDate = formatDateMask(parseDateMask(filmes.launchDate, 'yyyy/mm/dd'));
            }
            this.filmesForm.patchValue(filmes);
          }
        },
        error: (error) => {
          alert('Erro ao carregar o Filme com id ' + filmesId)
          console.error(error);
        }
      });
    }
  }

  ngOnInit() {}

}
