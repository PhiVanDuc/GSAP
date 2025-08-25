"use client"

import { useGSAP } from "@gsap/react";

import Link from "next/link";
import Image from "next/image";

import gsap from "gsap";
import { navLinks } from "@/constants";


export default function Navbar() {
    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: "nav",
                start: "bottom top"
            }
        });

        navTween.fromTo(
            "nav",
            {
                backgroundColor: "transparent",
                backdropFilter: "blur(0px)"
            },
            {
                backgroundColor: "#00000050",
                backdropFilter: "blur(10px)",
                duration: 1,
                ease: "power1.inOut"
            }
        )
    }, []);

    return (
        <nav>
            <div>
                <Link
                    href="/cocktail"
                    className="flex items-center gap-2"
                >
                    <Image
                        src="/cocktail/images/logo.png"
                        alt="Logo"
                        width={30}
                        height={30}
                    />
                    
                    <p>Velvet Pour</p>
                </Link>

                <ul>
                    {
                        navLinks.map(link => {
                            return (
                                <li key={link.id}>
                                    <Link href="">{link.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </nav>
    )
}
