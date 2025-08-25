"use client"

import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
];

export default function Page() {
    useGSAP(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".section-container",
                start: "top top",
                end: () => `${window.innerHeight * colors.length}px`,
                scrub: true,
                pin: true,
                snap: 1 / (colors.length - 1)
            }
        });

        colors.forEach((_, index) => {
            if (index === 0) return;

            const prev = `.section-${String(index).padStart(2, "0")}`;
            const curr = `.section-${String(index + 1).padStart(2, "0")}`;

            timeline
                .to(
                    prev,
                    {
                        opacity: 0,
                        zIndex: index
                    },
                    index - 0.5
                )
                .fromTo(
                    curr,
                    {
                        opacity: 0
                    },
                    {
                        opacity: 1,
                        zIndex: colors.length - index
                    },
                    index - 0.5
                )
        })
    }, []);

    return (
        <main
            className="section-container relative h-dvh w-full"
        >
            {
                colors.map((color, index) => (
                    <section
                        key={index}
                        className={`section-${String(index + 1).padStart(2, "0")} ${color} absolute inset-0 flex items-center justify-center text-[40px] text-white font-bold`}
                        style={{ zIndex: colors.length - index }}
                    >
                        Layer {String(index + 1).padStart(2, "0")}
                    </section>
                ))
            }
        </main>
    )
}