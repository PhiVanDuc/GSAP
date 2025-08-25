"use client"

import "@/app/styles/cocktail.css";

import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Cocktail from "./components/cocktail";
import About from "./components/about";
import Art from "./components/art";
import Menu from "./components/menu";

gsap.registerPlugin(
    ScrollTrigger,
    SplitText
);

export default function ClientCockTail() {
    return (
        <main>
            <Navbar />
            <Hero />
            <Cocktail />
            <About />
            <Art />
            <Menu />
        </main>
    )
}