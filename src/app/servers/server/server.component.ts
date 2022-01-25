import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Server } from '../interfaces/server.interface';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles: [
  ]
})
export class ServerComponent implements OnInit {
  server!: Server;

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {


  const id = +this.route.snapshot.params['id'];
  this.server = this.serversService.getServer(id);
 
  this.route.params.subscribe((params: Params) => {
    this.server = this.serversService.getServer(+params['id']);
  });

}
  onEdit() {

    //inyectar el router en el constructor
    //llamar al router y aplicar el navigate que espera un array
    //agregar el fragmento edit a la ruta actual
    // con relativeTo indicamos que el edit debe ser relativo a la ruta en la que nos encontremos
    //que siempre será /servers porque es el único sitio desde donde podemos acceder al EditServerComponent
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});

    // la propiedad queryParamsHandling espera un string y puede ser merge (fusiona cualquier param existente con los nuevos)
    // o preserve (reemplaza el comportamiento por defecto, es decir, mantiene los query Params en lugar de que se eliminen)
  }

}
