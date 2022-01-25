
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UsersService } from "./users/users.service";
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  loggedIn = false; //simula que el usuario no está logueado al entrar a la web
 
  //simularemos que el código de su interior tarda unos segundos en ejecutarse,
  //como si se conectara con un servidor. Para eso, creamos una promesa y usamos un setTimeout
  constructor(private userService: UsersService, private http: HttpClient){}
  
  isAuthenticated() {
    const token=JSON.parse(this.userService.getToken());
    let valido= false;

    this.isValid(token["access_token"]).subscribe(data =>
      {
        this.login();
        
      },err =>{
          console.log(err.message);
          this.logout();
          Swal.fire({
            title:'Su token ha expirado',
            text: 'vuelva a iniciar sesion',
            icon: 'error',
            confirmButtonText:'Ok'
          })
      }
      
      
      )
      return this.loggedIn;
     
      
     
    
     
    
  }
 
  //cambia el valor de la propiedad a true
  login() {
    this.loggedIn = true;
  }
  //devuelve a false el valor de la propiedad
  logout() {
    this.loggedIn = false;
    this.userService.delToken();
  }

  isValid(token:string){
      const url = 'http://localhost:8000/token';
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
      const options = {headers: headers}
      return this.http.get(url,options)     
    }
  }
