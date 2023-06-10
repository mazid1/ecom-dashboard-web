import { useLocation } from "react-router-dom";
import { ProductsList } from "../components/product/ProductsList";
import { history } from "../helpers/history";

export const ProductsPage = () => {
  // globally store current location
  history.location = useLocation();

  return <ProductsList />;
};
