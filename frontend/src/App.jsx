import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "@components/ProtectedRoute";
import NavBar from "@components/NavBar";
import Dashboard from "@pages/Dashboard";
import Users from "@pages/Users";
import Login from "@pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute adminOnly>
              <Users />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
