import { Routes, Route } from "react-router-dom"

import Home from "./pages/home"
import Classico from "./pages/classico"
import Descricao from "./pages/descricao"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/classico" element={<Classico />} />
      <Route path="/descricao" element={<Descricao />} />
    </Routes>
  )
}