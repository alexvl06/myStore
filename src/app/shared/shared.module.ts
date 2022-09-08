import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgComponent } from '../website/components/img/img.component';

import { HighlightDirective } from './directives/highlight.directive';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { ProductComponent } from '../website/components/product/product.component';
import { ProductsComponent } from '../website/components/products/products.component';
import { ReversePipe } from '../website/pipes/reverse.pipe';
import { TimeAgoPipe } from '../website/pipes/time-ago.pipe';



@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule
  ],
  exports: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective
  ]
})
export class SharedModule { }
