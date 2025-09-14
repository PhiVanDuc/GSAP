"use client"

import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

import AnimatedHeading from "./reuse/animated-heading";
import Button from "@/app/zentry/components/reuse/button";

import gsap from "gsap";
import { cn } from "@/utils/cn";
import oklchToHex from "@/utils/oklch-to-hex";

const contents = [
    {
        title: "Shaping Zentry Collectively",
        content: "ZENT holders shape governance, set direction, and steer the evolution of the Human-Agentic OS, serving as co-architects of a new civilization."
    },
    {
        title: "Unlocking Economic Opportunity",
        content: "ZENT is the index for crypto and AI, giving holders access to new markets, agent tokenization, data economies, and protocol rewards, unlocking utility and upside across the industries it powers."
    },
    {
        title: "Sharing Value Accrued",
        content: "ZENT holders benefit from Zentry’s ecosystem growth, capturing value from partnerships, treasury strategy, and real-world participation."
    }
]

export default function Abilities() {
    const isMobile = useMediaQuery({ maxWidth: "767px" });

    useGSAP(() => {
        let displayTimeline;
        let timeout;

        const handleAnimate = () => {
            if (displayTimeline) {
                if (displayTimeline.scrollTrigger) displayTimeline.scrollTrigger.kill();
                displayTimeline.kill();
                displayTimeline = undefined;
            }

            const pinEnd = `${window.innerHeight * 3}px`;

            displayTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: "#abilities",
                    start: "top top",
                    end: () => pinEnd,
                    scrub: true,
                    pin: true
                }
            })

            contents.forEach((_, i) => {
                const selector = `.abilities-content-${i + 1}`;

                displayTimeline.to(
                    selector,
                    {
                        onUpdate: function() {
                            const container = document.querySelector(selector);
                            if (!container) return;
                                                
                            const progress = this.progress();
                            const progressBar = container.querySelector(".progress");

                            const headerContent = container.querySelector(".header-content");
                            const header = headerContent.querySelector("h3");

                            const bodyContent = container.querySelector(".body-content");
                            const content = bodyContent.querySelector("p");

                            if (progress > 0 && progress < 1) {
                                headerContent.style.color = oklchToHex("oklch(21% 0.006 285.885)");
                                header.style.fontSize = isMobile ? "16px" : "22px";

                                bodyContent.style.height = `${content.getBoundingClientRect().height}px`;

                                const maxHeight = bodyContent.getBoundingClientRect().height;
                                progressBar.style.height = `${progress * maxHeight}px`;
                            }
                            else {
                                headerContent.style.color = oklchToHex("oklch(55.2% 0.016 285.938)");
                                header.style.fontSize = isMobile ? "13px" : "15px";
                                bodyContent.style.height = `0px`;
                                progressBar.style.height = "0px";
                            }
                        }
                    }
                );
            });
        }

        handleAnimate();

        const handleResize = () => {
            if (timeout) {
                clearTimeout(timeout);
                timeout = undefined;
            }

            timeout = setTimeout(() => { handleAnimate() }, 500);
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
            id="abilities"
            className={cn(
                "full-section-padding !pb-[20px] h-dvh flex flex-col",
                "md:!pb-[40px]"
            )}
        >
            <header className={cn(
                "flex flex-col items-center gap-[20px]",
                "sm:items-start"
            )}>
                <AnimatedHeading
                    heading={["the symbiotic world", "powered by zent"]}
                    triggerQuery=".abilities-header"
                    delay={0.3}
                    className={cn(
                        "abilities-header text-center",
                        "sm:text-start"
                    )}
                />

                <Button
                    label="enter vault"
                    className={cn(
                        "w-fit py-[18px] text-[12px] text-blue-50 font-medium uppercase bg-zinc-900",
                        "md:text-[14px]"
                    )}
                />
            </header>

            <div
                id="abilities-content"
                className="flex-1 flex flex-col justify-end gap-[15px] md:gap-[25px] "
            >
                {
                    contents.map((content, index) => {
                        const key = `abilities-content-${index + 1}`;

                        return(
                            <div
                                key={key}
                                className={`${key} space-y-[10px] md:space-y-[15px]`}
                            >
                                <div className="header-content flex items-center gap-[40px] text-zinc-500">
                                    <p className={cn(
                                        "shrink-0 w-[30px] text-[13px] text-center font-medium abilities-transition",
                                        "md:text-[15px]"
                                    )}>
                                        0{index + 1}
                                    </p>

                                    <h3 className={cn(
                                        "w-fit text-[13px] font-semibold font-circular-web uppercase abilities-transition",
                                        "md:text-[15px]"
                                    )}>
                                        {content.title}
                                    </h3>
                                </div>

                                <div className="body-content flex items-stretch gap-[40px] h-0 overflow-hidden abilities-transition">
                                    <div className="shrink-0 self-stretch w-[30px] flex justify-center">
                                        <div className="relative w-[4px] h-full rounded-full bg-zinc-400">
                                            <span className="progress block absolute top-0 left-0 right-0 bg-zinc-800 rounded-full abilities-transition !duration-0" />
                                        </div>
                                    </div>

                                    <p className={cn(
                                        "w-full max-w-[360px] h-fit text-[10px] text-zinc-600 font-general abilities-transition",
                                        "md:text-[13px]"
                                    )}>
                                        {content.content}
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}