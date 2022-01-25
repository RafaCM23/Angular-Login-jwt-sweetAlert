import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Server } from '../interfaces/server.interface';
import { ServersService } from '../servers.service';


@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html'
})
export class ServersComponent implements OnInit {
  public servers: Server[] = [];
  public server!: Server;

  constructor(private serversService: ServersService,
               private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();

   }

  onReload() {
    //this.router.navigate(['/servers']); //le estamos pidiendo a Angular es que nos lleve al path http://localhost:4200/servers, path en el que ya nos encontramos
  
    //this.router.navigate(['servers']); //funciona igual

    // en el routerLink si hay diferencia entre usar el path relativo o AbsoluteSourceSpan.
    // De hecho el relativo nos da error porque Angular intentaba ir a la ruta inexistente http://localhost:4200/servers/servers.
    // La razón por la que esta técnica funciona con el método "navigate" y no con el "routerLink", es porque,
    // al contrario que el "routerLink", el método "navigate" no sabe en qué ruta actual nos encontramos.
  
    // el routerLink se usa directamente en la template de un componente, por tanto, siempre sabrá cuál es la ruta actual
    // el método navigate también lo estamos usando dentro de un componente, pero no en su template,
    // sino en su código TypeScript. Con esto, Angular no tiene suficiente información para determinar la ruta actual.
    //Para que pueda averiguar la ruta el método navigate necesita un segundo argumento que será un objeto JS
    
    console.log(this.route); //http://localhost:4200/servers/servers

    this.router.navigate(['servers'], { relativeTo: this.route });

    //la propiedad relativeTo espera que le informemos sobre a qué ruta debe ser relativa el link que le pasamos en el primer parámetro
    //A la propiedad relativeTo debemos pasarle la ruta actual en la que nos encontremos, que previamente debemos inyectar en el constructor.
    //Para obtener esa ruta, Angular nos da una herramienta muy conveniente, el ActivatedRoute
    //El ActivatedRoute es un objeto JS que almacena metadatos sobre la ruta que esté actualmente activa.

    //no se rompe la app de mostrar error y que no se levante, sino de que no hace nada el botón al darle
    //para que se muestre un cambio lo que he hecho es añadir al app-module que es donde indico las rutas,
    //que si existe un error (como este) me redirija a la página de inicio
  
  }

}