import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/header/header";
import { NavBar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/footer";
import { Employees } from "./pages/Employees";
import { Organization } from "./pages/Organization";

export default function App() {
  return (
    <Router>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/employees" element={<Employees />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/" element={<Navigate to="/employees" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
};
