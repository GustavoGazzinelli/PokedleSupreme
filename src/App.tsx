import { Routes, Route } from "react-router-dom"

import Home from "./pages/home"
import Classico from "./pages/classico"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/classico" element={<Classico />} />
    </Routes>
  )
}