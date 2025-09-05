import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import { RiArrowUpSLine } from "react-icons/ri";
import { useEffect, useState } from "react";

export default function Navigation() {
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
                <ScrollUp />
            </main>
        </>
    )
}

function ScrollUp() {

    const [isShow, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShow(true);
            } else {
                setShow(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])

    if (!isShow) return (<></>);

    return (<div
        style={{
            position: "fixed",
            right: "10px",
            bottom: "15px",
            filter: "drop-shadow(20px)"
        }}>
        <a
            href="#"
            style={{
                padding: "0.6em",
                backgroundColor: "rgba(0,0,0,0.4)",
                borderRadius: "50%",
                textAlign: "center",
                fontSize: "18px",
            }}
        >
            <RiArrowUpSLine style={{
                color: "#fff",
                textRendering: "auto",
                fontWeight: "900",
                fontSize: "1.5rem",
            }} />
        </a>
    </div>)
}