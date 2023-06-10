import { Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { AddProduct } from "../components/product/AddProduct";
import { ProductsList } from "../components/product/ProductsList";
import { history } from "../helpers/history";

export const ProductsPage = () => {
  // globally store current location
  history.location = useLocation();

  return (
    <>
      <ProductsList />
      <Box mt={8}>
        <AddProduct />
      </Box>
    </>
  );
};
