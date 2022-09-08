import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryId: string | null = null;
  products: Product[] = [];
  offset = 0;
  productId:string|null = null

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.categoryId = params.get('id');
          if (this.categoryId) {
            return this.productsService.getByCategory(
              this.categoryId,
              10,
              this.offset
            );
          }
          return [];
        })
      )
      .subscribe((data) => {
        this.products = data;
      });
      this.route.queryParamMap.subscribe(params=>{
        this.productId = params.get('product')
        console.log('product ID:',this.productId)
      })
  }

  loadMore() {
    this.offset += 10;
    this.ngOnInit();
  }

  loadLess() {
    if (this.offset >= 0) {
      this.offset -= 10;
      this.ngOnInit();
    }
  }
}
