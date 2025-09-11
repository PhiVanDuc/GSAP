"use client"

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import AnimatedDesc from "./reuse/animated-desc";
import AnimatedHeading from "./reuse/animated-heading";

import gsap from "gsap";

export default function AboutDemo() {
    const pinRef = useRef();

    useGSAP(() => {
        gsap.to(
            pinRef.current,
            {
                scrollTrigger: {
                    trigger: pinRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    pin: true
                }
            }
        )
    }, []);

    return (
        <div className="overflow-hidden">
            <header
                className="about-header space-y-[30px] mt-[120px] mb-[20px] text-center uppercase"
                style={{ perspective: "1000px" }}
            >
                <AnimatedDesc
                    desc="welcome to zentry"
                    triggerQuery=".about-header"
                />

                <AnimatedHeading
                    heading={["discover the world's", "largest shared adventure."]}
                    triggerQuery=".about-header"
                    delay={0.3}
                />
            </header>

            <div
                ref={pinRef}
                className="h-screen bg-amber-400"
            >
            </div>
        </div>
    )
}
