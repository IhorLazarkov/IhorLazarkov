import "./NavBar.css"
import { Link } from "react-router-dom";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies 

export default function NavBar() {

    const getMenu = () => window.innerWidth <= 500
        ? <MobileMenu />
        : <DesktopMenu />

    const [menu, setMenu] = useState(getMenu())
    useEffect(() => {
        const handleResize = () => setMenu(getMenu())
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <>
            {menu}
        </>
    );
}

function MobileMenu() {
    const scrollY = useRef(window.scrollY)
    const [isOpen, setOpen] = useState(false)
    const [isHide, setHide] = useState(false)

    // GSAP
    const container = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            const delta = scrollY.current - window.scrollY
            if (delta > 0) {
                if (delta > 10) {
                    scrollY.current = window.scrollY
                }
                setHide(false)
            }
            else {
                if (delta < 0) {
                    scrollY.current = window.scrollY
                }
                if (window.scrollY > 0)
                    setHide(true)
            }
        };
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    // Animation for the nav bar
    useGSAP(() => {
        if (isHide) {
            gsap.to(container.current, { y: -100, duration: 0.5 })
        } else if (!isHide) {
            gsap.to(container.current, { y: 0, duration: 0.5 })
        }
    }, {
        scope: container,
        dependencies: [isHide]
    });


    return (<>
        <div role="navigation" aria-label="main navigation">
            <div style={{ position: "relative" }}>
                <div
                    ref={container}
                    style={{
                        cursor: "pointer",
                        zIndex: "2",
                        position: "fixed",
                        top: "0",
                        opacity: 1,
                        width: "100%",
                        backgroundColor: "var(--bg-color)",
                        boxSizing: "border-box",
                        padding: "0.5em"
                    }}
                    onClick={() => setOpen(!isOpen)}>

                    {isOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="32px"
                            width="32px"
                            viewBox="0 -960 960 960"
                            style={{ fill: "var(--border-color)" }}
                        >
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                    ) : (
                        <svg
                            style={{ fill: "var(--border-color)" }}
                            xmlns="http://www.w3.org/2000/svg"
                            height="32px"
                            width="32px"
                            viewBox="0 -960 960 960"
                        >
                            <path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z" />
                        </svg>
                    )}
                </div>
                {isOpen && <nav
                    role="navigation"
                    style={{
                        position: "fixed",
                        left: "0",
                        top: "20px"
                    }}>
                    <ul style={{
                        listStyle: "none",
                        padding: "0",
                        display: "flex",
                        flexDirection: "column",
                        "gap": "1.2em",
                        paddingTop: "1em",
                        paddingLeft: "1em",
                        paddingRight: "1em",
                    }}>
                        <li><Link onClick={() => setOpen(false)} to="/IhorLazarkov/">Home</Link></li>
                        <li><Link onClick={() => setOpen(false)} to="/IhorLazarkov/whatido">What I Do?</Link></li>
                        <li><Link onClick={() => setOpen(false)} to="/IhorLazarkov/experience">Experience</Link></li>
                        <li><Link onClick={() => setOpen(false)} to="/IhorLazarkov/projects">Projects</Link></li>
                        <li><Link onClick={() => setOpen(false)} to="/IhorLazarkov/education">Education</Link></li>
                        <li><Link onClick={() => setOpen(false)} to="/IhorLazarkov/recognition">Recognition</Link></li>
                    </ul>
                </nav>}
            </div>
        </div>
    </>);
}

function DesktopMenu() {
    return (
        <nav>
            <ul>
                <li><Link to="/IhorLazarkov/"><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon></Link></li>
                <li><Link to="/IhorLazarkov/whatido">What I Do?</Link></li>
                <li><Link to="/IhorLazarkov/experience">Experience</Link></li>
                <li><Link to="/IhorLazarkov/projects">Projects</Link></li>
                <li><Link to="/IhorLazarkov/education">Education</Link></li>
                <li><Link to="/IhorLazarkov/recognition">Recognition</Link></li>
            </ul>
        </nav>
    );
}