import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product:Product = {
    id: "",
    title: '',
    images: [],
    price: 0,
    category : {
      id:'',
      name: ''

    },
    description: ""
  }

  @Output() addedProduct = new EventEmitter<Product>()
  @Output() showProduct = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }
  addToCart(){
    this.addedProduct.emit(this.product)
  }
  showDetail(){
    this.showProduct.emit(this.product.id);
  }

}
