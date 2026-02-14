import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import PsychologistsPage from "../../pages/PsychologistsPage";
import FavoritesPage from "../../pages/FavoritesPage";
import Header from "../Header/Header";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshUser } from "../../redux/auth/operations";
import type { AppDispatch } from "../../redux/store";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { Toaster } from "react-hot-toast";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/psychologists" element={<PsychologistsPage />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}
