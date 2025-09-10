"use client"

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";

import Image from "next/image";
import AnimatedDesc from "./reuse/animated-desc";
import AnimatedHeading from "./reuse/animated-heading";

import gsap from "gsap";
import { cn } from "@/utils/cn";

export default function Story() {
    const storyRef = useRef();
    const storyImageRef = useRef();

    useGSAP(() => {
        gsap.to(
            storyRef.current,
            {
                scrollTrigger: {
                    trigger: storyRef.current,
                    start: "90% bottom",
                    end: "bottom bottom",
                    toggleActions: "restart none none reset"
                },
                backgroundColor: "#DFDFF0",
                duration: 0.1
            }
        );
    }, []);

    const getSkewByBreakpoint = () => {
        const width = window.innerWidth;
        if (width >= 1280) return 100;
        if (width >= 1024) return 80;
        if (width >= 768) return 60;
        if (width >= 640) return 40;
        return 30;
    };

    const calcPathStoryImage = () => {
        const img = storyImageRef.current;
        const width = img.getBoundingClientRect().width;
        const height = img.getBoundingClientRect().height;

        const r = 15;
        const skew = getSkewByBreakpoint();

        return `M ${0} ${r} A ${r} ${r} 0 0 1 ${r} ${0} L ${width - r} ${skew} A ${r} ${r} 0 0 1 ${width} ${skew + r} L ${width} ${height - skew - r} A ${r} ${r} 0 0 1 ${width - r} ${height - skew} L ${r} ${height} A ${r} ${r} 0 0 1 ${0} ${height - r} L ${0} ${r} Z`
    }

    useEffect(() => {
        let timeout;
        const img = storyImageRef.current;

        if (!img) return;

        const handleResize = () => {
            if (timeout) {
                clearTimeout(timeout);
                timeout = undefined;
            }

            timeout = setTimeout(() => {
                const path = calcPathStoryImage();
                img.style.clipPath = `path("${path}")`;
                img.style.webkitClipPath = `path("${path}")`;
            }, 300);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            if (timeout) {
                clearTimeout(timeout);
                timeout = undefined;
            }
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <section
            ref={storyRef}
            className="story py-[120px] bg-black overflow-hidden"
        >
            <div className="mb-[20px]">
                <AnimatedDesc
                    desc="the multiversal ip world"
                    triggerQuery=".story-header"
                    className="story-header text-blue-50 text-center uppercase"
                />
            </div>

            <div className="section-padding">
                <AnimatedHeading
                    heading={["the story of", "a hidden realm"]}
                    triggerQuery=".story-header"
                    delay={0.3}
                    className="relative story-header text-blue-50 text-center uppercase mix-blend-difference pointer-events-none z-10"
                />

                <div className="flex justify-center">
                    <Image
                        ref={storyImageRef}
                        src='/zentry/img/entrance.webp'
                        alt="Story Image"
                        width={2000}
                        height={2000}
                        className={cn(
                            "w-full max-w-[1000px] object-cover object-center mt-[40px]",
                            "md:translate-y-[-50px] md:mt-0 xl:translate-y-[-75px]"
                        )}
                    />
                </div>

                <div className="h-[400px]"></div>
            </div>
        </section>
    )
}