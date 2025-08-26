"use client"

import Hero from "./components/hero";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Zentry() {
    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            <Hero />

            <div className="h-[2000px]" />
        </main>
    )
}