import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

//el componente que la exporte debe tener un método llamado canDeactivate,
//cuyo tipo será una función que devuelva un observable, una promesa o un boolean
export interface CanComponentDeactivate {

  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  //es el método llamado cuando un usuario intente irse de la ruta
  //puede devolver un observable, una promesa o un boolean (igual que el canActivate guard)
  canDeactivate(component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();


    // Como primer argumento el componente en el que nos encontremos, que será de tipo CanComponenentDeactivate
    // Como segundo argumento espera la currentRoute, que es de tipo ActivatedRouteSnapshot
    // Como tercero, el currentState, de tipo RouterStateSnapshot
    // Como cuarto, el nextState, encargado de determinar a dónde queremos ir una vez abandonemos la ruta


  }
}