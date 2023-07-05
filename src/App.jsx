import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { TimeContextProvider } from "./contexts/TimeContext";
export function App() {
  return (
    <BrowserRouter>
      <TimeContextProvider>
        <div className="subpixel-antialiased  lg:h-full bg-zinc-800 text-zinc-50">
          <Router />
        </div>
      </TimeContextProvider>
    </BrowserRouter>
  );
}
