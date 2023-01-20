export type CartProduct = {
  title: string;
  subtitle: string;
  imageUrl: number;
  color: string;
  size: string;
  price: number;
};

export interface CartSliceState {
  cartProducts: CartProduct[];
}
