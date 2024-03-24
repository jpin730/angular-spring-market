import { Category } from './category.interface'

export interface Product {
  id: number
  name: string
  price: number
  category: Category
}

export interface ProductDto {
  id?: number
  name: string
  price: number
  categoryId?: number
}
