import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(email:string,password:string){
    const url = 'http://localhost:8000/auth/login';
    const body = {
      'email': email,
      'password': password 
    }
    return this.http.post(url, body);
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }
  delToken(){
    this.cookies.delete("token");
  }
}