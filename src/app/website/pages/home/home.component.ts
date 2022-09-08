import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products:Product[] = []
  productId:string|null = null
  offset = 0

  constructor(
    private productsService: ProductsService,
    private router:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productsService.getProductsByPagination(10, this.offset).subscribe(data=>{
      this.products = data
    })
    this.router.queryParamMap.subscribe(params=>{
      this.productId = params.get('product')
      console.log('product ID:',this.productId)
    })
  }


  loadMore(){
    this.offset +=10
    this.ngOnInit()
  }

  loadLess(){
    if(this.offset >= 0){
      this.offset -=10
      this.ngOnInit()
    }

  }

}
