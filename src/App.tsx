import "./styles/style.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { Home } from "./Components/HomeComponent";
import { Quiz } from "./Components/QuizComponent";
import { NotFound } from "./Components/NotFoundComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
