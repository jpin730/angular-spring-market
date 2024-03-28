export interface Order {
  id: number
  total: number
  paid: boolean
  customer: {
    id: number
    name: string
  }
}

export interface OrderDto {
  id?: number
  paid?: boolean
  customerId?: number
}
