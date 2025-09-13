"use client"

import { useGSAP } from "@gsap/react";

import AnimatedHeading from "./reuse/animated-heading";
import Button from "@/app/zentry/components/reuse/button";

import gsap from "gsap";
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
    useGSAP(() => {
        const pinEnd = `${window.innerHeight * 3}px`;

        const tl = gsap.timeline({
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

            tl.to(
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
                            header.style.fontSize = "22px";

                            bodyContent.style.height = `${content.getBoundingClientRect().height}px`;

                            const maxHeight = bodyContent.getBoundingClientRect().height;
                            progressBar.style.height = `${progress * maxHeight}px`;
                        }
                        else {
                            headerContent.style.color = oklchToHex("oklch(55.2% 0.016 285.938)");
                            header.style.fontSize = "15px";
                            bodyContent.style.height = `0px`;
                            progressBar.style.height = "0px";
                        }
                    }
                }
            );
        });
    }, []);

    return (
        <section
            id="abilities"
            className="full-section-padding !pb-[40px] h-screen flex flex-col justify-between"
        >
            <header className="space-y-[20px]">
                <AnimatedHeading
                    heading={["the symbiotic world", "powered by zent"]}
                    triggerQuery=".abilities-header"
                    delay={0.3}
                    className="abilities-header"
                />

                <Button
                    label="enter vault"
                    className="text-[14px] text-white font-medium uppercase bg-zinc-900 py-[15px]"
                />
            </header>

            <div
                id="abilities-content"
                className="space-y-[25px]"
            >
                {
                    contents.map((content, index) => {
                        const key = `abilities-content-${index + 1}`;

                        return(
                            <div
                                key={key}
                                className={`${key} space-y-[15px]`}
                            >
                                <div className="header-content flex items-center gap-[40px] text-zinc-500">
                                    <p className="shrink-0 w-[30px] text-[14px] text-center font-medium abilities-transition">
                                        0{index + 1}
                                    </p>

                                    <h3 className="text-[14px] font-semibold font-circular-web uppercase abilities-transition">
                                        {content.title}
                                    </h3>
                                </div>

                                <div className="body-content flex items-stretch gap-[40px] h-0 overflow-hidden abilities-transition">
                                    <div className="shrink-0 self-stretch w-[30px] flex justify-center">
                                        <div className="relative w-[4px] h-full rounded-full bg-zinc-400">
                                            <span className="progress block absolute top-0 left-0 right-0 bg-zinc-800 rounded-full abilities-transition !duration-0" />
                                        </div>
                                    </div>

                                    <p className="w-full max-w-[360px] h-fit text-[14px] text-zinc-600 font-general abilities-transition">
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