
// Si tenemos info dinámica que necesitamos rescatar justo antes de cargar una ruta

// Un resolver nos permitirá ejecutar un bloque de código justo antes de cargar una ruta,
// es decir, lo que hace es "pre-cargar" cierta información que nuestro componente necesitará a posteriori

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from '../servers.service';
 
export interface Server {
  id: number;
  name: string;
  status: string;
}
 
@Injectable()
export class ServerResolver implements Resolve<Server>{

    //la interfaz Resolve nos obliga a tener un método resolve() que espera la ruta del snapshot y el state del snapshot
 
  constructor(private serversService: ServersService) { }
 
  //el método resolve puede ser de 3 tipos: 
        //- un observable en forma del Server object
        //- una promesa en forma del Server object
        //- simplemente el Server (síncrono)
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(+route.params['id']);
  }
 
}