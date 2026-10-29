export interface Product {
  id: string
  title: string
  slug: string
  description: string
  brandId: string
  status: string
  attributes: Record<string, unknown>
  deletedAt: Date
  createdAt: Date
  updatedAt: Date
  categories: Category[]
  variants: Variant[]
  images: ProductImage[]
  reviews: productReviews[]
}

export interface Category {
  productId: string
  categoryId: string
}

export interface Variant {
  id: string
  productId: string
  sku: string
  price: number
  mrp: number
  attributes: Record<string, unknown>
  unitOfMeasure: string
  isActive: boolean
}

export interface ProductImage {
    id: string
    productId: string
    variantId: string
    url: string
    altText?: string | null
}

export interface productReviews {
  id: string
  userId: string
  productId: string
  rating: number
  comment?: string | null
}