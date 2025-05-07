import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/inbox', icon: 'mail' },
    { title: 'Filmes', url: '/filmes', icon: 'paper-plane' },
    { title: 'Estúdios', url: '/folder/favorites', icon: 'heart' },
    { title: 'Diretor', url: '/folder/archived', icon: 'archive' },
    { title: 'Review', url: '/folder/trash', icon: 'trash' },
    { title: 'Perfil', url: '/folder/spam', icon: 'warning' },
  ];
  constructor() {}
}
