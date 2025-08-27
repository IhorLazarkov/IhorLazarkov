import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

export default function Navigation() {
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
        </>
    )
}