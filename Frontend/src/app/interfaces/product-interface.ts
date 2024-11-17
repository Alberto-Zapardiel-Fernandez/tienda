export interface ProductInterface {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  idCategory: any;
  imageUrl: string;
  quantity: number | undefined;
}
