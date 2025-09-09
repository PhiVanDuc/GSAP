"use client"

import { useGSAP } from "@gsap/react";

import Logo from "./logo";

import gsap from "gsap";
import { cn } from "@/utils/cn";
import SplitText from "gsap/SplitText";

export default function Loading({ className, isLoading }) {
    useGSAP(() => {
        const split = SplitText.create(
            ".logo-label",
            { type: "chars" }
        );
        
        gsap.to(
            split.chars,
            {
                keyframes: [
                    { y: -5, duration: 0.2, ease: "power1.out" },
                    { y: 5, duration: 0.4, ease: "power1.in" },
                    { y: 0, duration: 0.2, ease: "power1.out" }
                ],
                stagger: 0.1,
                repeat: -1,
                repeatDelay: 0.5
            }
        )
    }, []);

    useGSAP(
        () => {
            if (isLoading) {
                gsap.to(
                    ".zentry-loading",
                    {
                        zIndex: 50,
                        opacity: 1,
                        duration: 0,
                        ease: "none"
                    }
                )
            }
            else {
                gsap.timeline()
                    .to(
                        ".zentry-loading",
                        {
                            opacity: 0,
                            duration: 0.5,
                            ease: "power1.out"
                        }
                    )
                    .to(
                        ".zentry-loading",
                        {
                            zIndex: -10,
                            duration: 0,
                            ease: "none"
                        }
                    );
            }
        },
        [isLoading]
    );

    return (
        <div
            className={cn(
                "zentry-loading fixed inset-0 flex items-center justify-center gap-[25px] bg-indigo-600 z-50",
                className
            )}
        >
            <Logo />
            <p className="logo-label text-[40px] text-blue-50 font-semibold font-zentry">Zentry</p>
        </div>
    )
}