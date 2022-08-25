import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { checkTime } from '../interceptors/time.interceptor';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }


  get(id: string){

    return this.http.get<Product>(`${environment.API_URL}/api/products/${id}`)
  }

  create(dto: CreateProductDTO){
    return this.http.post<Product>(`${environment.API_URL}/api/products/`,dto)
  }

  update(id:string, dto:UpdateProductDTO){
    return this.http.put<Product>(`${environment.API_URL}/api/products/${id}`, dto)
  }

  delete(id:string){
    return this.http.delete<boolean>(`${environment.API_URL}/api/products/${id}`)
  }

  getProductsByPagination(limit?:number, offset?:number){
    let params = new HttpParams();
    if(limit&&offset){
      params = params.set('limit', limit)
      params = params.set('offset', offset)
    }
    return this.http.get<Product[]>(`${environment.API_URL}/api/products`, {params, context: checkTime()})
    .pipe(
      map(products=>products.map(item=>{
        return{
          ...item,
          taxes:.19*item.price
        }
      }))
    )
  }
}

