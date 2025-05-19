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
  estudio: Estudios | undefined;

  constructor(
    private estudiosService: EstudiosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const estudioId = parseInt(this.activatedRoute.snapshot.params['estudiosId']);
    if (estudioId) {
      this.estudio = this.estudiosService.getById(estudioId);
    }
  }

  editEstudio() {
    if (this.estudio?.id) {
      this.router.navigate(['/estudios/edit', this.estudio.id]);
    }
  }

  deleteEstudio() {
    if (this.estudio) {
      this.estudiosService.remove(this.estudio);
      this.router.navigate(['/estudios']);
    }
  }

  formatDate(date: Date | string): string {
    if (date instanceof Date) {
      return date.toLocaleDateString('pt-BR');
    }
    return date;
  }
} 