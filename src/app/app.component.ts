import { Component } from '@angular/core';
import { Product } from './models/product.model';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = 'https://www.w3schools.com/howto/img_avatar.png';
  showImage= true;

  constructor(
    private authService: AuthService,
    private userService:UsersService
  ){}


  onLoaded(URLImg: string) {
    console.log('parent log:', URLImg);
  }

  showImg(){
    this.showImage = !this.showImage
  }

  createUser(){
    this.userService.create({
      name: "Alexis Ávila Ortiz",
      email: 'avila@software.com',
      password: 'Argenis0rtiz'
    }).subscribe(rta=>{
      console.log(rta)
    })
  }

  login(){
    this.authService.login('avila@software.com', 'Argenis0rtiz').subscribe(rta=>{
      console.log(rta.access_token)
    })
  }
}
