export interface OrderItem {
  purchaseId: number
  quantity: number
  total: number
  product: {
    id: number
    name: string
    price: number
  }
}

export interface OrderItemDto {
  purchaseId?: number
  productId?: number
  quantity: number
}
