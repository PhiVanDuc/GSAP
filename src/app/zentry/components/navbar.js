"use client"

import { useEffect, useRef } from "react";

import Logo from "@/app/zentry/components/reuse/logo";
import Button from "@/app/zentry/components/reuse/button";

import { FiMenu } from "react-icons/fi";
import { TiLocationArrow } from "react-icons/ti";

const navbarItems = [
    "zterminal",
    "about",
    "contact"
]

export default function Navbar() {
    const navbarRef = useRef();
    const lastScrollRef = useRef(0);
    const displayStateRef = useRef("top");

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            
            if (currentScroll <= 100 && currentScroll >= 0) {
                if (displayStateRef.current !== "top") {
                    navbarRef.current.classList.remove("zentry-navbar-on");
                    displayStateRef.current = "top";
                }
            }
            else {
                if (currentScroll > lastScrollRef.current) {
                    if (displayStateRef.current !== "hidden") {
                        navbarRef.current.classList.remove("zentry-navbar-on");
                        navbarRef.current.classList.add("zentry-navbar-down");
                        displayStateRef.current = "hidden";
                    }
                }
                else {
                    if (displayStateRef.current !== "visible") {
                        navbarRef.current.classList.remove("zentry-navbar-down");
                        navbarRef.current.classList.add("zentry-navbar-on");
                        displayStateRef.current = "visible";
                    }
                }
            }

            lastScrollRef.current = currentScroll;
        }

        window.addEventListener("scroll", handleScroll);
        return () => { window.removeEventListener("scroll", handleScroll) }
    }, []);

    return (
        <nav
            ref={navbarRef}
            className="fixed top-[15px] left-[20px] right-[20px] px-[25px] py-[15px] flex items-center justify-between bg-[oklch(21% 0.006 285.885 / 0)] rounded-[15px] translate-y-[0%] opacity-100 transition-all duration-500 ease-in-out z-50"
        >
            <div className="flex items-center gap-[30px]">
                <Logo
                    size={20}
                    className="cursor-pointer"
                    translateTop="translate-x-[1px] translate-y-[3px]"
                    translateDown="translate-x-[-1px] translate-y-[-3px]"
                />

                <Button
                    label="Products"
                    icon={<TiLocationArrow size={18} />}
                    iconSide="right"
                    className="hidden sm:flex px-[20px] py-[9px] text-[10px] font-semibold bg-blue-50 uppercase"
                />
            </div>

            <ul className="hidden sm:flex items-center gap-[10px]">
                {
                    navbarItems.map((item, index) => {
                        return (
                            <Button
                                key={index}
                                label={item}
                                className="px-[20px] py-[12px] text-[12px] text-white font-general font-semibold uppercase bg-transparent hover:text-zinc-800 hover:bg-blue-50 transition-colors duration-300"
                            />
                        )
                    })
                }
            </ul>

            <FiMenu
                size={25}
                className="block sm:hidden text-white cursor-pointer"
            />
        </nav>
    )
}