import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/inbox', icon: 'home' },
    { title: 'Filmes', url: '/filmes', icon: 'images' },
    { title: 'Estúdios', url: '/folder/inbox', icon: 'business' },
    { title: 'Diretor', url: '/diretor', icon: 'videocam' },
    { title: 'Review', url: '/folder/trash', icon: 'reader' },
    { title: 'Perfil', url: '/folder/spam', icon: 'person-circle' },
  ];
  constructor() {}
}
