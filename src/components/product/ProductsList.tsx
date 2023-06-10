import { Button, Spinner, useDisclosure } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import { Product } from "../../redux/api/@types";
import { useGetAllProductsQuery } from "../../redux/api/productApiSlice";
import { DataTable } from "../common/DataTable";
import { ProductFormModal } from "./ProductFormModal";

const { accessor: createColumn } = createColumnHelper<Product>();

export const ProductsList = () => {
  const {
    data: products,
    isSuccess,
    isError,
    error,
  } = useGetAllProductsQuery();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clickedProduct, setClickedProduct] = useState<Product>();

  const columns = [
    createColumn("name", {
      header: "Product Name",
      cell: ({ row }) => (
        <Button
          colorScheme="teal"
          variant="link"
          onClick={() => {
            setClickedProduct(row.original);
            onOpen();
          }}
        >
          {row.original.name}
        </Button>
      ),
    }),
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
    return (
      <>
        <DataTable columns={columns} data={products} />
        <ProductFormModal
          isOpen={isOpen}
          onClose={onClose}
          headerText="Add a new product"
          saveButtonText="Save Product"
          product={clickedProduct}
        />
      </>
    );
  }

  if (isError) {
    return <div>{error.toString()}</div>;
  }

  return <Spinner />;
};
