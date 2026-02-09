import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import PsychologistsPage from "../../pages/PsychologistsPage";
import FavoritesPage from "../../pages/FavoritesPage";
import Header from "../Header/Header";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/psychologists" element={<PsychologistsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}
