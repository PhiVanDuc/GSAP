"use client"

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import gsap from "gsap";
import { cn } from "@/utils/cn";
import SplitText from "gsap/SplitText";

export default function AnimatedDesc({ desc, triggerQuery = "", className }) {
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
            className={cn(
                "text-[10px] font-general",
                "sm:text-[11px]",
                className
            )}
        >
            {desc}
        </p>
    )
}