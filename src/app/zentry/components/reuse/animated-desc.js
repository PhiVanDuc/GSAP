"use client"

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import clsx from "clsx";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

export default function AnimatedDesc({ desc, triggerQuery = "" }) {
    const descRef = useRef();

    useGSAP(() => {
        if (!descRef.current) return;

        const split = SplitText.create(
            descRef.current,
            { type: "words" }
        );

        gsap.from(
            split.words,
            {
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: triggerQuery,
                    start: "50% bottom",
                    toggleActions: "restart none none reset",
                }
            }
        );
    }, []);

    return (
        <p
            ref={descRef}
            className={clsx(
                "text-[10px]",
                "sm:text-[11px]"
            )}
        >
            {desc}
        </p>
    )
}