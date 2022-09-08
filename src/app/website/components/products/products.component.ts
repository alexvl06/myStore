import { Component, Input } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCart:Product[]
  statusDetail: 'loading'|'success'|'error'|'init' = 'init'
  total=0
  today = new Date()
  @Input() products: Product[] = [];
  @Input()
  set productId(id: string|null){
    if(id){
      this.getDetail(id)
    }
  }
  showProductDetail = false;
  chosenProduct:Product = {
    id:'',
    price:0,
    images:[],
    title:'',
    category:{
      id:'',
      name:''
    },
    description:''
  }

  constructor(
    private storeService:StoreService,
    private productsService: ProductsService
    ) {
    this.myShoppingCart = storeService.getShoppingCart()
   }


  addToShoppingCart(product:Product){
    this.storeService.addProduct(product)
    this.total = this.storeService.getTotal()
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail
  }

  getDetail(id: string){
    this.statusDetail = 'loading'
    this.productsService.get(id).subscribe(data=>{
      this.chosenProduct = data;
      if(!this.showProductDetail){
        this.showProductDetail=true
      }
      this.statusDetail = 'success'
    }, error=> console.error('Product not found error:', error.error.message))
    this.statusDetail = 'error'
  }

  createNewProduct(){
    const product:CreateProductDTO = {
      title: 'New Product',
      description: 'This is a new product creation to test the create request by http protocol using angular framework and its http client module',
      images: ['https://placeimg.com/640/480/any?t=1661273013809'],
      price: 100,
      categoryId:2

    }
    this.productsService.create(product).subscribe(data=>{
      this.products.unshift(data)
    })
  }

  updateProduct(){
    const changes:UpdateProductDTO = {
      title: 'A changed title only to show how update function works'
    }
    const id = this.chosenProduct.id;
    this.productsService.update(id, changes).subscribe(data=>{
      this.chosenProduct = data
      this.products[this.products.findIndex(item=>item.id===this.chosenProduct.id)] = data;
    })
  }
  deleteProduct(){
    this.productsService.delete(this.chosenProduct.id).subscribe(data=>{
      if(data){
        this.products.splice(this.products.findIndex(item=>item.id== this.chosenProduct.id),1);
        alert('The product was deleted successfully')
        this.showProductDetail = false;
      }
    })
  }

}
