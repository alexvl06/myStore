import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, tap, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = `${environment.API_URL}/api/auth`
  private user = new BehaviorSubject<User|null>(null)
  user$ = this.user.asObservable();


  constructor(
    private http:HttpClient,
    private tokenService:TokenService
  ) { }


  getProfile(){
    const headers = new HttpHeaders();
    return this.http.get<User>(`${this.API_URL}/profile`)
    .pipe(
      tap(user=>this.user.next(user))
    )
  }

  login(email:string, password: string){
    return this.http.post<Auth>(`${this.API_URL}/login`, {email, password}).pipe(
      tap(response=> this.tokenService.save(response.access_token)),
    )

  }
  logout(){
    this.tokenService.removeToken();
  }
}
