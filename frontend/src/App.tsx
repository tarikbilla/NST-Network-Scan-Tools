import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Allip from "./pages/Allip/Allip";
import Singleip from "./pages/Singleip/Singleip";
import NotFound from "./pages/NotFound";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
import './index.css'

export default function App() {
  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="relative w-[1024px] h-[768px] bg-white  shadow-xl rounded-[10px] overflow-hidden">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allip" element={<Allip />} />
            <Route path="/singleip" element={<Singleip />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}
