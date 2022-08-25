import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, SimpleChange, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit{
  img:string = ''

 @Input('img')
 set changeImg(newImg: string){
  this.img=newImg
  console.log('img has changed:',this.img)
 }
 @Input() alt:string = ''
 @Output() loaded = new EventEmitter<string>();
 defaultImage:string = 'https://latarta.com.co/wp-content/uploads/2018/06/default-placeholder.png'


  constructor() { }

  ngOnInit(): void {

  }

  imgError(){
    this.img = this.defaultImage
  }


  loadEvent(){
    console.log("child log")
    this.loaded.emit(this.img)
  }

}
