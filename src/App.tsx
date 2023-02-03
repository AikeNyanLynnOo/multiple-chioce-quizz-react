import "./styles/style.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./Components/HomeComponent";
import { Quiz } from "./Components/QuizComponent";
import { NotFound } from "./Components/NotFoundComponent";
import { Result } from "./Components/ResultComponent";

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
    path: "/results",
    element: <Result />,
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
