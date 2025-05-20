import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  showMenu = true;

  public appPages = [
    { title: 'Home', url: '/folder/inbox', icon: 'home' },
    { title: 'Filmes', url: '/filmes', icon: 'images' },
    { title: 'Estúdios', url: '/estudios', icon: 'business' },
    { title: 'Diretor', url: '/diretor', icon: 'videocam' },
    { title: 'Perfil', url: '/usuarios', icon: 'person-circle' },
  ];
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showMenu = !['/login'].includes(event.urlAfterRedirects);
      }
    });
  }
}


