"use client"

import { useEffect } from "react";

import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import Features from "./components/features";
import Story from "./components/story";
import Abilities from "./components/abilities";

import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Zentry() {
    useEffect(() => { ScrollTrigger.normalizeScroll(true) }, []);

    return (
        <main
            id="zentry"
            className="relative"
        >
            <Navbar />
            <Hero />
            <About />
            <Features />
            <Story />
            <Abilities />
        </main>
    )
}