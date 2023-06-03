import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { TimeContextProvider } from "./contexts/TimeContext";
export function App() {
  return (
    <BrowserRouter>
      <TimeContextProvider>
        <Router />
      </TimeContextProvider>
    </BrowserRouter>
  );
}
