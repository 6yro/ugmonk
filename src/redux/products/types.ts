export type Product = {
  id: string;
  title: string;
  price: number;
  imageUrl: number;
  category: string;
  subtitle?: string;
  discountPrice?: number;
  isSoldOut?: boolean;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
  NEVER = "never",
}

export interface ProductsSliceState {
  products: Product[];
  paginationLinks: any;
  status: Status;
}

export type fetchProductsParams = {
  currentCategory: string;
  _page: number;
};
