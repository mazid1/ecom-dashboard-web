import { useLocation } from "react-router-dom";
import { history } from "../helpers/history";

export const ProductsPage = () => {
  // globally store current location
  history.location = useLocation();

  return <div>ProductsPage</div>;
};
