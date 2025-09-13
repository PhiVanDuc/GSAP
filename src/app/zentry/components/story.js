"use client"

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";

import Image from "next/image";
import Button from "./reuse/button";
import TiltedCard from "./reuse/tilted-card";
import AnimatedDesc from "./reuse/animated-desc";
import AnimatedHeading from "./reuse/animated-heading";

import gsap from "gsap";
import { cn } from "@/utils/cn";
import oklchToHex from "@/utils/oklch-to-hex";

export default function Story() {
    const storyImageRef = useRef();
    const storyButtonRef = useRef();

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

        const handleApplyPath = () => {
            const path = calcPathStoryImage();
            img.style.clipPath = `path("${path}")`;
            img.style.webkitClipPath = `path("${path}")`;
        }

        handleApplyPath();

        const handleResize = () => {
            if (timeout) {
                clearTimeout(timeout);
                timeout = undefined;
            }

            timeout = setTimeout(() => { handleApplyPath() }, 500);
        }
        
        window.addEventListener("resize", handleResize);

        return () => {
            if (timeout) {
                clearTimeout(timeout);
                timeout = undefined;
            }

            window.removeEventListener("resize", handleResize);
        }
    }, []);

    useGSAP((_, contextSafe) => {
        let contentTween;
        let colorsTimeline;
        let timeout;

        const handleTween = contextSafe(() => {
            if (contentTween) {
                if (contentTween.scrollTrigger) contentTween.scrollTrigger.kill();
                contentTween.kill();
                contentTween = undefined;
            }

            if (colorsTimeline) {
                if (colorsTimeline.scrollTrigger) colorsTimeline.scrollTrigger.kill();
                colorsTimeline.kill();
                colorsTimeline = undefined;
            }

            contentTween = gsap.to(
                "#story-content",
                {
                    scrollTrigger: {
                        trigger: "#story-content",
                        start: "top bottom",
                        toggleActions: "restart none none reset"
                    },
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 1
                }
            );

            colorsTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: "#story",
                    start: "bottom bottom",
                    end: "bottom bottom",
                    scrub: true,
                    toggleAttribute: "restart none none reset"
                },
                onComplete: () => { document.body.style.backgroundColor = "#DFDFF0" },
                onReverseComplete: () => { document.body.style.backgroundColor = "black" },
            })
            .to(
                ".story-header",
                { color: oklchToHex("oklch(21% 0.006 285.885)") }
            )
            .to(
                ".story-desc",
                { color: oklchToHex("oklch(21% 0.006 285.885)") }
            )
            .to(
                "#story-content",
                { color: oklchToHex("oklch(21% 0.006 285.885)") },
                "<"
            )
            .to(
                storyButtonRef.current,
                {
                    color: "#DFDFF0",
                    backgroundColor: oklchToHex("oklch(21% 0.006 285.885)")
                },
                "<"
            );
        });

        handleTween();

        const handleResize = () => {
            if (timeout) {
                clearTimeout(timeout);
                timeout = undefined;
            }

            timeout = setTimeout(() => { handleTween() }, 500);
        }

        window.addEventListener("resize", handleResize);

        return () => {
            if (timeout) {
                clearTimeout(timeout);
                timeout = undefined;
            }

            window.removeEventListener("resize", handleResize);
        }
    }, []);

    return (
        <section
            id="story"
            className={cn(
                "pb-[120px] pt-[60px] overflow-hidden",
                "md:pt-[120px]"
            )}
        >
            <AnimatedDesc
                desc="the multiversal ip world"
                triggerQuery=".story-desc"
                className="story-desc text-blue-50 text-center uppercase mb-[20px]"
            />

            <div className="section-padding">
                <AnimatedHeading
                    heading={["the story of", "a hidden realm"]}
                    triggerQuery=".story-header"
                    delay={0.3}
                    className={cn(
                        "story-header relative text-blue-50 text-center uppercase pointer-events-none z-10",
                        "md:mix-blend-difference"
                    )}
                />

                <div className="flex justify-center">
                    <TiltedCard
                        tilt={10}
                        className={cn(
                            "mt-[40px]",
                            "md:translate-y-[-50px] md:mt-0 xl:translate-y-[-60px]"
                        )}
                    >
                        <Image
                            ref={storyImageRef}
                            src='/zentry/img/entrance.webp'
                            alt="Story Image"
                            width={2000}
                            height={2000}
                            className="w-[1000px] aspect-video object-cover object-center"
                        />
                    </TiltedCard>
                </div>
            </div>

            <div className={cn(
                "flex justify-center mt-[40px]",
                "md:mt-[60px] xl:justify-end xl:mr-44"
            )}>
                <div className={cn(
                    "flex flex-col items-center gap-[20px]",
                    "xl:items-start"
                )}>
                    <p
                        id="story-content"
                        className={cn(
                            "max-w-sm text-center font-circular-web text-violet-50 opacity-0 translate-x-[-20px] translate-y-[20px]",
                            "xl:text-start"
                        )}
                    >
                        Where realms converge, lies Zentry and the boundless pillar.
                        Discover its secrets and shape your fate amidst infinite
                        opportunities.
                    </p>

                    <Button
                        ref={storyButtonRef}
                        label="discover prologue"
                        className="w-fit py-[18px] font-medium uppercase bg-blue-50"
                    />
                </div>
            </div>
        </section>
    )
}