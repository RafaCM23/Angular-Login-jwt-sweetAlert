import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  onLoadServers() {
    // complex code that connects to a backend
   
    // navigation to Servers page  --> debemos tener acceso al Router de Angular, para así indicarle nuestra intención de navegar a alguna ruta.
      //Podemos hacerlo simplemente inyectando el Router en el constructor. Le damos el nombre de router, por ejemplo, y lo transformamos en una propiedad.
      this.router.navigate(['/servers']); //El primer elemento del array será el primer segmento del path. Por tanto, si queremos navegar hasta Servers, le pasamos la ruta /servers (path absoluto).
    }

    onLoadServer(id: number) {
      // complex code that connects to a backend
     
      // navigation to Servers page
      //navigate (array['segmento1', 'segmento2'], {queryParams: { key: 'value' }, fragment: 'value'})
      this.router.navigate(['/servers', id, 'edit'], { queryParams: { allowEdit: '8' }, fragment: 'loading' });
    
      //al hacer click en el botón va a  http://localhost:4200/servers/8/edit?allowEdit=8#loading
    
    }

    onlogin() {
      this.authService.login();
    }
   
    onlogout() {
      this.authService.logout();
    }

}
