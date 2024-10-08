import React from "react";
import Navbar from "./components/Navbar";
import Createproduct from "./components/Createproduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DisplayProduct from "./components/DisplayProduct";
import AddToCart from "./components/AddToCart";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/create" element={<Createproduct />} />
          <Route path="/" element={<DisplayProduct />} />

          <Route path="/cart" element={<AddToCart />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
