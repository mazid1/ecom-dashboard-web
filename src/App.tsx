import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Sidebar from "./components/layout/Sidebar";
import RequireAuth from "./components/auth/RequireAuth";
import ProductsPage from "./pages/ProductsPage";

function App() {
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
}

export default App;
