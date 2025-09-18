import "./NavBar.css"
import { NavLink } from "react-router-dom";
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
                        zIndex: "2",
                        position: "fixed",
                        top: "0",
                        opacity: 1,
                        width: "100%",
                        backgroundColor: "var(--bg-color)",
                        boxSizing: "border-box",
                        padding: "0.5em",
                        display: "flex",
                        justifyContent: "space-between",
                    }}>

                    {isOpen ? (
                        <svg
                            onClick={() => setOpen(false)}
                            xmlns="http://www.w3.org/2000/svg"
                            height="32px"
                            width="32px"
                            viewBox="0 -960 960 960"
                            style={{
                                fill: "var(--border-color)",
                                cursor: "pointer"
                            }}
                        >
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                    ) : (
                        <svg
                            onClick={() => setOpen(true)}
                            style={{
                                fill: "var(--border-color)",
                                cursor: "pointer",
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            height="32px"
                            width="32px"
                            viewBox="0 -960 960 960"
                        >
                            <path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z" />
                        </svg>
                    )}
                    {SecondaryNavBar()}
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
                        <li><NavLink onClick={() => setOpen(false)} to="/IhorLazarkov/">Home</NavLink></li>
                        <li><NavLink onClick={() => setOpen(false)} to="/IhorLazarkov/whatido">What I Do?</NavLink></li>
                        <li><NavLink onClick={() => setOpen(false)} to="/IhorLazarkov/experience">Experience</NavLink></li>
                        <li><NavLink onClick={() => setOpen(false)} to="/IhorLazarkov/projects">Projects</NavLink></li>
                        <li><NavLink onClick={() => setOpen(false)} to="/IhorLazarkov/education">Education</NavLink></li>
                        <li><NavLink onClick={() => setOpen(false)} to="/IhorLazarkov/recognition">Recognition</NavLink></li>
                    </ul>
                </nav>}
            </div>
        </div>
    </>);
}

function DesktopMenu() {
    return (
        <>
            <div style={{ display: "flex", alignItems: "center"}}>
                <nav>
                    <ul>
                        <li><NavLink to="/IhorLazarkov/"><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon></NavLink></li>
                        <li><NavLink to="/IhorLazarkov/whatido">What I Do?</NavLink></li>
                        <li><NavLink to="/IhorLazarkov/experience">Experience</NavLink></li>
                        <li><NavLink to="/IhorLazarkov/projects">Projects</NavLink></li>
                        <li><NavLink to="/IhorLazarkov/education">Education</NavLink></li>
                        <li><NavLink to="/IhorLazarkov/recognition">Recognition</NavLink></li>
                    </ul>
                </nav>
                {SecondaryNavBar()}
            </div>
        </>
    );
}

function SecondaryNavBar() {
    return (<div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "baseline" }}>
        <svg xmlns="http://www.w3.org/2000/svg"
            height="32px"
            width="32px"
            viewBox="0 -960 960 960"
            style={{
                cursor: "pointer",
                fill: "var(--border-color)",
                marginRight: "1em"
            }}
            onClick={() => {
                window.navigator.share({
                    url: "https://ihorlazarkov.github.io/IhorLazarkov/"
                })
            }}>
            <path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z" />
        </svg>
        <a href="mailto:ilazarkov@gmail.com">
            <svg xmlns="http://www.w3.org/2000/svg"
                height="32px"
                width="32px"
                viewBox="0 -960 960 960"
                style={{
                    cursor: "pointer",
                    fill: "var(--border-color)",
                    marginRight: "1em"
                }}>
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
            </svg>
        </a>
    </div>
    )
}