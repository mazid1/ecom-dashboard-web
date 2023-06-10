import { CreateProductDto } from "../../components/product/ProductForm";
import {
  DeleteManyResponse,
  Product,
  UpdateProductMutationArgs,
} from "./@types";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query<Product[], void>({
      query: () => "/products",
      providesTags: (result = [], error, arg) => [
        ...result.map(({ _id }) => ({
          type: "PRODUCT" as const,
          id: _id,
        })),
        { type: "PRODUCT", id: "LIST" },
      ],
    }),
    getProductById: build.query<Product, string>({
      query: (productId) => `/products/${productId}`,
      providesTags: (result, error, arg) => [{ type: "PRODUCT", id: arg }],
    }),
    createProduct: build.mutation<Product, CreateProductDto>({
      query: (productDto) => ({
        url: "/products",
        method: "POST",
        body: productDto,
      }),
      invalidatesTags: [{ type: "PRODUCT", id: "LIST" }],
    }),
    updateProduct: build.mutation<Product, UpdateProductMutationArgs>({
      query: (data) => ({
        url: `/products/${data.id}`,
        method: "PATCH",
        body: data.productDto,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "PRODUCT", id: arg.id },
      ],
    }),
    deleteProductById: build.mutation<void, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "PRODUCT", id: "LIST" }],
    }),
    deleteManyProducts: build.mutation<DeleteManyResponse, string[]>({
      query: (productIds) => ({
        url: "/products",
        method: "DELETE",
        body: { ids: productIds },
      }),
      invalidatesTags: [{ type: "PRODUCT", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductByIdMutation,
  useDeleteManyProductsMutation,
} = productApiSlice;
