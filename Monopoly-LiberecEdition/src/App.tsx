import {RouterProvider, createRoutesFromElements, Route, createBrowserRouter} from "react-router-dom";
import Game from "./pages/Game.tsx";
import Menu from "./pages/Menu.tsx";
import Winner from "./pages/Winner.tsx";

export const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Menu />} />
                <Route path="/Game" element={<Game />} />
                <Route path="/Winner" element={<Winner />} />
            </>
        ), {basename: "/2023-p3a-mpa-react-project-hongolem"}
    )
    return (
        <RouterProvider router={router} />
    )
}

export default App;