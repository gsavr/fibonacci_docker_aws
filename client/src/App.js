import { Routes, Route } from "react-router-dom";
import "./App.css";
import Fib from "./pages/Fib";
import { Header } from "./components/Header";
import OtherPage from "./pages/OtherPage";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App container-sm mt-3">
      <Header />
      <Routes>
        <Route path="/" element={<Fib />} />
        <Route path="/how_it_works" element={<OtherPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
