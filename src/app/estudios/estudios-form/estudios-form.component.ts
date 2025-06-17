import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationValidators } from 'src/app/core/validators/url.validator';
import { EstudiosService } from '../services/estudios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { dateMask, formatDateMask, maskitoElement, parseDateMask } from 'src/app/core/constants/mask.constants';

@Component({
  selector: 'app-estudios-form',
  templateUrl: './estudios-form.component.html',
  styleUrls: ['./estudios-form.component.scss'],
  standalone: false,
})
export class EstudiosFormComponent  implements OnInit {

  
  dateMask = dateMask;
  maskitoElement = maskitoElement;

  estudiosForm: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
    sobre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(300)]),
    launchDate: new FormControl('', Validators.required),
    dono: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
    image: new FormControl('', [Validators.required, ApplicationValidators.urlValidator])
  });
  estudiosId!: number;

  constructor(
    private estudiosService: EstudiosService, 
    private router: Router,
    private activatedRoute: ActivatedRoute, 
  
  ) { 
    const estudiosId = parseInt(this.activatedRoute.snapshot.params['estudiosId'])
    if(estudiosId){
      const estudios = this.estudiosService.getById(estudiosId);
      if(estudios){
        this.estudiosId = estudiosId;
        if(estudios.launchDate instanceof Date) {
          estudios.launchDate = formatDateMask(estudios.launchDate);
        }
        this.estudiosForm.patchValue(estudios);
      }
    }
  }

  ngOnInit() {}
  hasError(field: string, error: string){
    const formControl = this.estudiosForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

  save(){
    let { value } = this.estudiosForm;
    if(value.launchDate){
      value.launchDate = parseDateMask(value.launchDate);
    }
    this.estudiosService.save({
      ...value,
      id: this.estudiosId
    });
    this.router.navigate(['/estudios']);
  }

}
