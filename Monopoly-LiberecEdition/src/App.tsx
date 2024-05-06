import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import Game from "./pages/Game.tsx";
import Menu from "./pages/Menu.tsx";

export const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements([
            <Route path="/" element={<Menu />} />,
            <Route path="/game" element={<Game />} />,
        ]),{
            basename: "/2023-p3a-mpa-react-project-hongolem",
        }
    )
    return (
        <RouterProvider router={router} />
    )
}

export default App;