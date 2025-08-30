"use client"

import { useGSAP } from "@gsap/react";

import gsap from "gsap";
import clsx from "clsx";
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
            className={clsx(
                "zentry-loading fixed inset-0 flex items-center justify-center gap-[25px] bg-indigo-600 z-50",
                className
            )}
        >
            <div className="rotate-z-[12deg] w-fit h-fit">
                <div className="zentry-logo-right w-[30px] aspect-square bg-blue-50 translate-x-[2px] translate-y-[5px]" />
                <div className="zentry-logo-left w-[30px] aspect-square bg-blue-50 translate-x-[-2px] translate-y-[-5px]" />
            </div>

            <p className="logo-label text-[40px] text-blue-50 font-semibold font-zentry">Zentry</p>
        </div>
    )
}