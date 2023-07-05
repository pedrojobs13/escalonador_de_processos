import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { TimeContextProvider } from "./contexts/TimeContext";
import { TimeContextToFairShareProvider } from "./contexts/TimeContextToFairShare";
export function App() {
  return (
    <BrowserRouter>
      <TimeContextProvider>
        <TimeContextToFairShareProvider>
          <div className="subpixel-antialiased  lg:h-full bg-zinc-800 text-zinc-50">
            <Router />
          </div>
        </TimeContextToFairShareProvider>
      </TimeContextProvider>
    </BrowserRouter>
  );
}
