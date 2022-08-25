export interface Category{
  id:string;
  name:string;
}

export interface Product {
  id:string
  title:string;
  images: string[];
  description: string;
  price:number;
  category:Category;
  taxes?: number;
}

export interface CreateProductDTO extends Omit<Product, 'id'|'category'>{
  categoryId: number
}

export interface UpdateProductDTO extends Partial<CreateProductDTO>{}

