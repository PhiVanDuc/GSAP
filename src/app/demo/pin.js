"use client"

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Pin() {
    const pinSectionRef = useRef();

    useGSAP(() => {
        gsap.to(
            pinSectionRef.current,
            {
                scrollTrigger: {
                    trigger: pinSectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    pin: true
                }
            }
        )
    }, []);

    return (
        <main>
            <section className='w-full h-[400px] bg-amber-400'></section>

            <section
                ref={pinSectionRef}
                className='w-full h-screen bg-blue-400'
            ></section>

            <section className='w-full h-[400px] bg-red-400'></section>
            <section className='w-full h-[400px] bg-green-400'></section>
        </main>
    )
}
