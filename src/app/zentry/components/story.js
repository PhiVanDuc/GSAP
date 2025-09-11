"use client"

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";

import Image from "next/image";
import Button from "./reuse/button";
import TiltedCard from "./reuse/tilted-card";
import AnimatedDesc from "./reuse/animated-desc";
import AnimatedHeading from "./reuse/animated-heading";

import { cn } from "@/utils/cn";
import gsap from "gsap";

export default function Story() {
    const storyRef = useRef();
    const storyImageRef = useRef();
    const storyDesc = useRef();

    const calcPathStoryImage = () => {
        const img = storyImageRef.current;
        const width = img.getBoundingClientRect().width;
        const height = img.getBoundingClientRect().height;

        const r = 15;
        const skew =
            width >= 1280 ? 120 :
            width >= 1024 ? 80 :
            width >= 768 ? 60 :
            width >= 640 ? 40 :
            30;

        return `M ${0} ${r} A ${r} ${r} 0 0 1 ${r} ${0} L ${width - r} ${skew} A ${r} ${r} 0 0 1 ${width} ${skew + r} L ${width} ${height - skew - r} A ${r} ${r} 0 0 1 ${width - r} ${height - skew} L ${r} ${height} A ${r} ${r} 0 0 1 ${0} ${height - r} L ${0} ${r} Z`;
    }

    useEffect(() => {
        const img = storyImageRef.current;
        if (!img) return;

        let timeout;
        
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

    useGSAP(() => {
        gsap.to(
            storyDesc.current,
            {
                scrollTrigger: {
                    trigger: storyDesc.current,
                    start: "80% bottom",
                    toggleActions: "restart none none reset",
                },
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.8
            }
        )
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
                    <TiltedCard
                        className="h-auto"
                        tilt={10}
                    >
                        <Image
                            ref={storyImageRef}
                            src='/zentry/img/entrance.webp'
                            alt="Story Image"
                            width={2000}
                            height={2000}
                            className={cn(
                                "w-full max-w-[1000px] object-cover object-center mt-[40px]",
                                "md:translate-y-[-40px] md:mt-0 xl:translate-y-[-60px]"
                            )}
                            onLoad={() => {
                                const img = storyImageRef.current;
                                
                                if (img) {
                                    const path = calcPathStoryImage();
                                    img.style.clipPath = `path("${path}")`;
                                    img.style.webkitClipPath = `path("${path}")`;
                                }
                            }}
                        />
                    </TiltedCard>
                </div>
            </div>

            <div className={cn(
                "flex justify-center mt-[40px]",
                "lg:justify-end lg:mt-[120px] lg:mr-44"
            )}>
                <div className={cn(
                    "flex flex-col items-center gap-[20px]",
                    "lg:items-start"
                )}>
                    <p
                        ref={storyDesc}
                        className={cn(
                            "max-w-sm text-center font-circular-web text-violet-50 opacity-0 translate-x-[-20px] translate-y-[20px]",
                            "lg:text-start"
                        )}
                    >
                        Where realms converge, lies Zentry and the boundless pillar.
                        Discover its secrets and shape your fate amidst infinite
                        opportunities.
                    </p>

                    <Button
                        label="discover prologue"
                        className="w-fit py-[18px] font-medium uppercase bg-blue-50"
                    />
                </div>
            </div>
        </section>
    )
}