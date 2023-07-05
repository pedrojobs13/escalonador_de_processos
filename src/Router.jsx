import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Fifo } from "./pages/Fifo";
import { Sjf } from "./pages/Sjf";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Str } from "./pages/Str";
import { Round } from "./pages/Round";
import { Priorities } from "./pages/Priorities";
import { Guaranteed } from './pages/Guaranteed'
import { Lottery } from "./pages/Lottery";
import { FairShare } from './pages/FairShare'


export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Fifo />} />
        <Route path="/sjf" element={<Sjf />} />
        <Route path="/str" element={<Str />} />
        <Route path="/round" element={<Round />} />
        <Route path="/priorities" element={<Priorities />} />
        <Route path="/guaranteed" element={<Guaranteed />} />
        <Route path="/lottery" element={<Lottery />} />
        <Route path="/fairshare" element={<FairShare />} />
      </Route>
    </Routes>
  );
}
