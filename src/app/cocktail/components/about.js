"use client"

import { useGSAP } from "@gsap/react";

import Image from "next/image";

import gsap from "gsap";
import { SplitText } from "gsap/all";

export default function About() {
    useGSAP(() => {
        const titleSplit = SplitText.create("#about h2", { type: "words" });

        gsap.timeline({
            scrollTrigger: {
                trigger: "#about",
                start: "top center",
            }
        })
        .from(titleSplit.words, {
            opacity: 0,
            duration: 1,
            yPercent: 100,
            ease: "expo.out",
            stagger: 0.02
        })
        .from(".top-grid div, .bottom-grid div", {
            opacity: 0,
            duration: 1,
            ease: "power1.inOut",
            stagger: 0.04
        }, "-=0.7")
    }, []);

    return (
        <div id="about">
            <div className="mb-16 md:px-0 px-5">
                <div className="content">
                    <div className="md:col-span-8">
                        <p className="badge">Best Cocktail</p>
                        <h2>
                            Where every detail matters
                            <span className="text-white">-</span>
                            from muddle to garnish
                        </h2>
                    </div>

                    <div className="sub-content">
                        <p>Every cocktail we serve is a reflection of our obsession with detail - from the first muddle to the final garnish. That care is what turns a simple drink into something truly momorable.</p>

                        <div>
                            <p className="md-text-3xl text-xl front-bold">
                                <span>4.5</span>/5
                            </p>

                            <p className="text-sm text-white-100">
                                More than +12000 customers
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="top-grid">
                <div className="xl:col-span-3">
                    <div className="noisy" />
                    <Image
                        src="/cocktail/images/abt1.png"
                        alt="grid-image-1"
                        width={300}
                        height={300}
                    />
                </div>

                <div className="xl:col-span-6">
                    <div className="noisy" />
                    <Image
                        src="/cocktail/images/abt2.png"
                        alt="grid-image-2"
                        width={300}
                        height={300}
                    />
                </div>

                <div className="xl:col-span-3">
                    <div className="noisy" />
                    <Image
                        src="/cocktail/images/abt5.png"
                        alt="grid-image-5"
                        width={300}
                        height={300}
                    />
                </div>
            </div>

            <div className="bottom-grid">
                <div className="xl:col-span-8">
                    <div className="noisy" />
                    <Image
                        src="/cocktail/images/abt3.png"
                        alt="grid-image-3"
                        width={300}
                        height={300}
                    />
                </div>

                <div className="xl:col-span-4">
                    <div className="noisy" />
                    <Image
                        src="/cocktail/images/abt4.png"
                        alt="grid-image-4"
                        width={300}
                        height={300}
                    />
                </div>
            </div>
        </div>
    )
}
