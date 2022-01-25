import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  user!: {id: number, name: string};
  //a través de esta propiedad y del ActivatedRoute accederemos a los datos de la URL (fetch)

  //a través de esta propiedad y del ActivatedRoute accederemos a los datos de la URL (fetch)

  
  paramsSubscription!: Subscription; // propiedad para almacenar la suscripción de tipo Subscription from rxjs
 // propiedad para almacenar la suscripción de tipo Subscription from rxjs

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    //Para acceder a los valores del objeto user utilizamos
    //la propiedad del ActivatedRoute: snapshot,
    //a través de la cual accedemos a params y le pasamos el que queramos rescatar

    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']

    //   //user espera dos propiedades (id y name) que rescatará de lo que hayamos
    //   //definido en nuestros parámetros de la ruta (app.module.ts)
     };

    //  //Para poder reaccionar a cambios que ocurran después de la inicialización de un componente --> Observable
    // this.route.params
    // .subscribe(
    //   (updatedParams) => {
    //     this.user.id = updatedParams['id'];
    //     this.user.name = updatedParams['name'];
    //   }
    // );

    //Guardamos el Observable dentro de la propiedad paramsSubscription
    this.paramsSubscription = this.route.params
    .subscribe(
      (updatedParams) => {
        this.user.id = updatedParams['id'];
        this.user.name = updatedParams['name'];
      }
    );
  }

  //esto lo hace Angular por defecto por lo que no es necesario hacerlo nosotros
  //desuscribirnos del Observable
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}