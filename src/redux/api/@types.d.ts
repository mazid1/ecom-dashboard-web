import {
  CreateProductDto,
  UpdateProductDto,
} from "../../components/product/ProductForm";

export type User = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
};

export type Product = {
  _id: string;
} & CreateProductDto;

export type DeleteManyResponse = {
  acknowledged: boolean;
  deletedCount: number;
};

export type UpdateProductMutationArgs = {
  productDto: UpdateProductDto;
  id: string;
};
