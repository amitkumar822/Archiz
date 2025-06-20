import App from "@/App";
import Login from "@/pages/auth/Login";
import Home from "@/pages/home/Home";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

export { router };
