import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Fifo } from "./pages/Fifo";
import { Sjf } from "./pages/Sjf";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Str } from "./pages/Str";
import { Round } from "./pages/Round";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Fifo />} />
        <Route path="/sjf" element={<Sjf />} />
        <Route path="/str" element={<Str />} />
        <Route path="/round" element={<Round />} />
      </Route>
    </Routes>
  );
}
