//el archivo edit-server.component.ts está usando el servicio Servers para obtener el server con el ID 1 y poder actualizarlo.

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Server } from '../interfaces/server.interface';
import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html'
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server!: Server; // le estoy diciendo que soy consciente de que no está inicializado pero te aseguro que luego se va a inicializar
  serverName = '';
  serverStatus = '';

  allowEdit = false;

  changesSaved = false; //cambiará a true cuando la función onUpdateServer se dispare

  constructor(private serversService: ServersService,
    //Para poder acceder a los query params y a los fragmentos, necesitamos inyectar la ActivatedRoute
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // this.server = this.serversService.getServer(1);
    // this.serverName = this.server.name;
    // this.serverStatus = this.server.status;

    // //al suscribirnos a los observables "queryParams" y "fragment" en lugar del snapshot
    // //nuestro código será reactivo y estará al tanto cuando suceda algún cambio en los parámetros de la URL

    // this.route.queryParams.subscribe(); //determinaremos si estamos autorizados a editar el servidor o no
    // this.route.fragment.subscribe();

    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      })

      //actualizar el ID para obtenerlo dinámicamente. 
      //Creamos una variable y accedemos al ID de la ruta. No olvides convertirlo a número
      const id = +this.route.snapshot.params['id']
      this.server = this.serversService.getServer(id);    
  };

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  //aquí escribimos la lógica de programación para determinar lo que pasará cuando un usuario intente irse de la ruta
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    //Comprobamos si el usuario tiene permitido editar un servidor. Si no, le dejamos ir
    if (!this.allowEdit) {
      return true;
    }
    //comprobación para ver si el serverName es el mismo que había al principio o si el serverStatus ha cambiado
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      //Si uno de los dos ha sufrido cambios y no han sido guardados, devolvemos una ventana de confirmación pregutándo si quiere descartar los cambios
      return confirm('Do you want to exit without saving your changes?');
    } else {
      //si no se cumple nada, devuelve true
      return true;
    }
  } 

}