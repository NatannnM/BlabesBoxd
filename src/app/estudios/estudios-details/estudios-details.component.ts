import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudios } from '../models/estudios.type';
import { EstudiosService } from '../services/estudios.service';

@Component({
  selector: 'app-estudios-details',
  templateUrl: './estudios-details.component.html',
  styleUrls: ['./estudios-details.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class EstudiosDetailsComponent implements OnInit {
  estudios!: Estudios;

  constructor(
    private estudiosService: EstudiosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const estudiosId = this.activatedRoute.snapshot.params['estudiosId'];
    this.estudiosService.getById(estudiosId).subscribe({
      next: (response) => {
        this.estudios = response;
      },
      error: (error) => {
        alert('Erro ao carregar estúdio');
        console.error(error);
      }  
    });
  }

  editEstudio() {
    return this.estudiosService.save(this.estudios);
  }

  deleteEstudio() {
    return this.estudiosService.remove(this.estudios);
  }
} 