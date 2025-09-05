"use client"

import Hero from "./components/hero";
import About from "./components/about";

import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Zentry() {
    return (
        <main className="relative min-h-screen">
            {/* <Hero /> */}
            <About />

            <div className="h-[2000px]" />
        </main>
    )
}