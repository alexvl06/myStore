import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/category.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  showMenu = false
  counter = 0
  categories:Category[] = []
  profile: User|null = null

  constructor(
    private storeService: StoreService,
    private categoriesServices: CategoriesService,
    private authService: AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products=>{
      this.counter = products.length
    })
    this.getAllCategories()
    this.authService.user$.subscribe(
      user =>{this.profile=user}
    )
  }

  btnMenu(){
    this.showMenu = !this.showMenu
  }

  getAllCategories(){
    this.categoriesServices.getAll()
    .subscribe(data=>{
      this.categories = data;
    })
  }

  login(){
    this.authService.login('admin@mail.com', 'admin123').subscribe(()=>{
        this.ngOnInit()
        this.router.navigate(['/profile'])

    })
  }



  logout(){
    this.authService.logout()
    this.profile = null
    this.router.navigate(['/home'])
  }
}
