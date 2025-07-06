import { Routes, Route, BrowserRouter } from "react-router-dom";

import ConsultaPNCP from "./Pages/ConsultaPNCP";
import CarrinhoPNCP from "./Pages/CarrinhoPNCP";

export function RouteApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConsultaPNCP />} />
        <Route path="/carrinho" element={<CarrinhoPNCP />} />
      </Routes>
    </BrowserRouter>
  );
}
