import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = `${environment.API_URL}/api/auth`

  constructor(
    private http:HttpClient
  ) { }

  login(email: string, password:string){
    return this.http.post<Auth>(`${this.API_URL}/login`, {email, password})
  }

  profile(token:string){
    return this.http.get(`${this.API_URL}/profile`)
  }
}
