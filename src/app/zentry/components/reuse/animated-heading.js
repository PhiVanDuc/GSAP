"use client"

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import gsap from "gsap";
import { cn } from "@/utils/cn";
import SplitText from "gsap/SplitText";

export default function AnimatedHeading({
    heading = [],
    triggerQuery = "",
    delay = 0,
    className = ""
}) {
    const headingRef = useRef();

    useGSAP(() => {
        if (!headingRef.current) return;
        
        const split = SplitText.create(
            headingRef.current,
            { type: "words" }
        );

        gsap.to(
            headingRef.current,
            {
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                x: 0,
                y: 0,
                duration: 1,
                delay: delay,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: triggerQuery,
                    start: "50% bottom",
                    toggleActions: "restart none none reset",
                }
            }
        );

        gsap.from(
            split.words,
            {
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                delay: delay,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: triggerQuery,
                    start: "50% bottom",
                    toggleActions: "restart none none reset",
                }
            }
        );
    }, []);

    return (
        <h2
            ref={headingRef}
            className={cn(
                "title text-[50px] font-zentry leading-none origin-center rotate-x-[-40deg] rotate-y-[-70deg] rotate-z-[-45deg]",
                "sm:text-[65px]",
                "lg:text-[90px]",
                className
            )}
            style={{ transformStyle: "preserve-3d" }}
        >
            {
                heading.map((text, index) => {
                    return (
                        <span key={index}>
                            {text}
                            <br />
                        </span>
                    )
                })
            }
        </h2>
    )
}