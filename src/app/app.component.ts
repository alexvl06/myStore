import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FileService } from './services/file.service';
import { TokenService } from './services/token.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  imgParent = 'https://www.w3schools.com/howto/img_avatar.png';
  showImage= true;
  token = ''
  email = ''
  imgRta=''


  constructor(
    private authService: AuthService,
    private userService:UsersService,
    private fileService:FileService,
    private tokenService:TokenService
  ){}

  ngOnInit(){
    const token = this.tokenService.getToken();
    if(token){
      this.authService.getProfile().subscribe()
    }

  }


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
      password: 'Argenis0rtiz',
      role: 'cosutmer'
    }).subscribe(rta=>{
      console.log(rta)
    })
  }




  downloadPDF(){
    this.fileService.getFile('mine.jpg', '/wp-content/uploads/2015/03/denticion.jpg', 'image/jpg').subscribe(res=>{

    })
  }

  upload(event:Event){
    const element = event.target as HTMLInputElement
    const file = element.files?.item(0)
    if(file){
      this.fileService.uploadFile(file).subscribe(rta=>{
        this.imgRta=rta.location;
      })
    }

  }
}
