import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/login/services/auth.service';
import { Usuarios_Filmes } from 'src/app/usuarios/models/usuarios_filmes.type';
import { Usuarios_FilmesService } from 'src/app/usuarios/services/usuarios_filmes.service';

@Component({
  selector: 'app-assistido',
  templateUrl: './assistido.page.html',
  styleUrls: ['./assistido.page.scss'],
  standalone: false
})
export class AssistidoPage implements OnInit {
  nota: number = 0;
  filmesId!: string;
  notas: number[] = Array.from({length: 10}, (_,i) => i+1);
  review = '';

  constructor(
    private route: ActivatedRoute,
    private usuarios_filmesService: Usuarios_FilmesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.filmesId = this.route.snapshot.paramMap.get('filmesId')!;
  }

  async avaliar() {
    const usuarioId = (await this.authService.getUsuarioId())!; 

    const data: Usuarios_Filmes = {
      usuariosId: usuarioId,
      filmesId: this.filmesId,
      nota: this.nota,
      review: this.review
    };
    console.log(data);
    this.usuarios_filmesService.save(data).subscribe(() => {
      this.router.navigate(['/filmes']);
    });
  }
}
