import {
  Button,
  Checkbox,
  Spinner,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Product } from "../../redux/api/@types";
import { useGetAllProductsQuery } from "../../redux/api/productApiSlice";
import { DataTable } from "../common/DataTable";
import { AddProduct } from "./AddProduct";
import { DeleteProducts } from "./DeleteProducts";
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
  const [rowSelection, setRowSelection] = useState({});

  const indices = Object.keys(rowSelection);
  const selectedProductIds: string[] = [];
  for (const idx of indices) {
    if (products?.[Number(idx)]?._id) {
      selectedProductIds.push(products?.[Number(idx)]?._id);
    }
  }

  const columns = useMemo(
    () => [
      createColumn("_id", {
        header: ({ table }) => (
          <Checkbox
            {...{
              isChecked: table.getIsAllRowsSelected(),
              isIndeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              isChecked: row.getIsSelected(),
              isDisabled: !row.getCanSelect(),
              isIndeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      }),
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
    ],
    []
  );

  if (isSuccess) {
    return (
      <>
        <DataTable
          columns={columns}
          data={products}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
        />
        <Stack mt={8} direction="row" gap={4}>
          <AddProduct />
          <DeleteProducts selectedProductIds={selectedProductIds} />
        </Stack>
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
