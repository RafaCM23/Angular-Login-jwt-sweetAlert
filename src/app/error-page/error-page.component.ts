import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: []
})
export class ErrorPageComponent implements OnInit {

  errorMessage!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // le damos a errorMessage el valor de la propiedad message, accediendo a ella desde el snapshot de la ruta
    //this.errorMessage = this.route.snapshot.data['message'];

    //en caso de que se puedan producir cambios cuando aún estemos en la página, suscribiéndonos al observable "data"
    this.route.data.subscribe(
      (data: Data) => {
        this.errorMessage = data['message']; 
      }
    )

  }

}
