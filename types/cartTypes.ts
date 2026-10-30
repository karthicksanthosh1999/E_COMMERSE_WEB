import { Variant, Product } from "./productTypes";

export interface Cart {
  id: string;
  userId: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  variantId: string;
  qty: number;
  cart: Cart;

  variant: Variant & {
    product: Product;
  };
}