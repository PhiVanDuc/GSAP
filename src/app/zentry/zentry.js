"use client"

import { useEffect } from "react";

import Hero from "./components/hero";
import About from "./components/about";
import Features from "./components/features";
import Story from "./components/story";

import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Zentry() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, SplitText);
        ScrollTrigger.normalizeScroll(true);
    }, [])

    return (
        <main className="relative">
            <Hero />
            {/* <About /> */}
            <Features />
            <Story />

            <div className="h-[2000px]"></div>
        </main>
    )
}