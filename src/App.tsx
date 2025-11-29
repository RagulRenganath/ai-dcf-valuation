import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="p-6 text-xl">App Running ✔</div>} />
      </Routes>
    </BrowserRouter>
  );
}
