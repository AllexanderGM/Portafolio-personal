// Dependencias
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componentes
import Home from "../pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
