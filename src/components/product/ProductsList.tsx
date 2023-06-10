import { Spinner } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { Product } from "../../redux/api/@types";
import { useGetAllProductsQuery } from "../../redux/api/productApiSlice";
import { DataTable } from "../common/DataTable";

const { accessor: createColumn } = createColumnHelper<Product>();

export const ProductsList = () => {
  const {
    data: products,
    isSuccess,
    isError,
    error,
  } = useGetAllProductsQuery();

  const columns = [
    createColumn("name", { header: "Product Name" }),
    createColumn("price", { header: "Unit Price" }),
    createColumn("status", { header: "Status" }),
    createColumn("availableSince", {
      header: "Available Since",
      cell: (info) => {
        const value = info.getValue();
        if (value) {
          const date = new Date(value);
          return date.toLocaleDateString();
        }
        return undefined;
      },
    }),
  ];

  if (isSuccess) {
    return <DataTable columns={columns} data={products} />;
  }

  if (isError) {
    return <div>{error.toString()}</div>;
  }

  return <Spinner />;
};
