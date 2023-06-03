import { Routes, Route , BrowserRouter} from "react-router-dom";

import { Fifo } from "./pages/Fifo";
import { Sjf } from "./pages/Sjf";
import { DefaultLayout } from "./layouts/DefaultLayout";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout/>}>
      <Route path="/" element={<Fifo />}></Route>
      <Route path="/sjf" element={<Sjf />}></Route>
      </Route>
    </Routes>
    
  );
}
