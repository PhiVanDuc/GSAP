"use client"

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import clsx from "clsx";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

export default function AnimatedHeading({
    heading = [],
    triggerQuery = "",
    // direction = "left-to-right"
}) {
    const headingRef = useRef();

    useGSAP(() => {
        if (!headingRef.current) return;
        
        const split = SplitText.create(
            headingRef.current,
            { type: "words" }
        );

        // gsap.to(
        //     headingRef.current,
        //     {
        //         rotationX: 0,
        //         rotationY: 0,
        //         rotationZ: 0,
        //         x: 0,
        //         y: 0,
        //         duration: 1,
        //         ease: "power3.out",
        //         scrollTrigger: {
        //             trigger: triggerQuery,
        //             start: "50% bottom",
        //             toggleActions: "restart none none reset",
        //         }
        //     }
        // );

        gsap.from(
            split.words,
            {
                opacity: 0,
                stagger: 0.1,
                duration: 1,
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
            className={clsx(
                "title text-[50px] font-zentry leading-none origin-center",
                "sm:text-[65px]",
                "lg:text-[90px]",
                // direction === "left-to-right" ? "rotate-x-[-40deg] rotate-y-[-70deg] rotate-z-[-45deg]" :
                // direction === "right-to-left" ? "rotate-x-[40deg] rotate-y-[70deg] rotate-z-[45deg]" :
                // "rotate-x-[-40deg] rotate-y-[-70deg] rotate-z-[-45deg]"
            )}
            // style={{ transformStyle: "preserve-3d" }}
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