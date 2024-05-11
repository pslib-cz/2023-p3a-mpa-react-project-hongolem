import {RouterProvider, createHashRouter, createRoutesFromElements, Route} from "react-router-dom";
import Game from "./pages/Game.tsx";
import Menu from "./pages/Menu.tsx";
import Winner from "./pages/Winner.tsx";

export const App = () => {
    const router = createHashRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Menu />} />
                <Route path="/Game" element={<Game />} />
                <Route path="/Winner" element={<Winner />} />
            </>
        )
    )
    return (
        <RouterProvider router={router} />
    )
}

export default App;