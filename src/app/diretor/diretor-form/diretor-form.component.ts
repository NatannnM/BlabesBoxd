import { Component, OnInit } from '@angular/core';  
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateMask, formatDateMask, maskitoElement, parseDateMask } from 'src/app/core/constants/mask.constants';
import { ApplicationValidators } from 'src/app/core/validators/url.validator';
import { DiretorService } from '../services/diretor.service';
import { ActivatedRoute, Router } from '@angular/router';
  
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
    launchDate: new FormControl('', Validators.required),
  });
  diretorId!: number;

  constructor(private diretorService: DiretorService, 
    private router: Router,
    private activatedRoute: ActivatedRoute, 
  ) { 
    const diretorId = parseInt(this.activatedRoute.snapshot.params['diretorId'])
    if(diretorId){
      const diretor = this.diretorService.getById(diretorId);
      if(diretor){
        this.diretorId = diretorId;
        if(diretor.launchDate instanceof Date) {
          diretor.launchDate = formatDateMask(diretor.launchDate);
        }
        this.diretorForm.patchValue(diretor);
      }
    }
    
  }

  ngOnInit() {}
 hasError(field: string, error: string){
    const formControl = this.diretorForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

  save(){
    let { value } = this.diretorForm;
    if(value.launchDate){
      value.launchDate = parseDateMask(value.launchDate);
    }
    this.diretorService.save({
      ...value,
      id: this.diretorId
    });
    this.router.navigate(['/diretor']);
  }
}
