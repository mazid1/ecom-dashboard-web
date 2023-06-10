import { Route, Routes, useNavigate } from "react-router-dom";
import { RequireAuth } from "./components/auth/RequireAuth";
import { Sidebar } from "./components/layout/Sidebar";
import { history } from "./helpers/history";
import { LoginPage } from "./pages/LoginPage";
import { ProductsPage } from "./pages/ProductsPage";

export const App = () => {
  // initialize global application history navigate function
  history.navigate = useNavigate();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <RequireAuth>
            <Sidebar />
          </RequireAuth>
        }
      >
        <Route path="/" element={<ProductsPage />} />
      </Route>
    </Routes>
  );
};
