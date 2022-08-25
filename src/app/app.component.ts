import { Component } from '@angular/core';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = 'https://www.w3schools.com/howto/img_avatar.png';
  showImage= true;


  onLoaded(URLImg: string) {
    console.log('parent log:', URLImg);
  }

  showImg(){
    this.showImage = !this.showImage
  }
}
