import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserLogin} from "../common/user-login";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {
  }

  login(data: UserLogin): Observable<any> {
    console.log(data)
    return this.httpClient.post<any>("http://localhost:8083/auth/login", data, httpOptions)
  }
}
