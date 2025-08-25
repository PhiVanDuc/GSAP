"use client"

import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

import Image from "next/image";

import gsap from "gsap";
import { featureLists, goodLists } from "@/constants";

export default function Art() {
    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        const start = isMobile ? "top 20%" : "top top";

        const maskTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#art",
                start,
                end: "bottom top",
                scrub: true,
                pin: true
            }
        });

        maskTimeline
            .to(
                ".will-fade",
                {
                    opacity: 0,
                    stagger: 0.2,
                    ease: "power1.inOut"
                }
            )
            .to(
                ".masked-img",
                {
                    scale: 1.3,
                    maskPosition: "center",
                    maskSize: "400%",
                    ease: "power1.inOut"
                }
            )
            .to(
                "#masked-content",
                {
                    opacity: 1,
                    duration: 1.5,
                    ease: "power1.inOut"
                }
            )
    }, []);

    return (
        <div id="art">
            <div className="container mx-auto h-full pt-20">
                <h2 className="will-fade">The ART</h2>

                <div className="content">
                    <ul className="space-y-4 will-fade">
                        {
                            goodLists.map((feature, index) => {
                                return (
                                    <li key={index} className="flex items-center gap-2">
                                        <Image
                                            src="/cocktail/images/check.png"
                                            alt="check"
                                            width={17}
                                            height={17}
                                        />
                                        <p>{feature}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>

                    <div className="cocktail-img">
                        <Image
                            src="/cocktail/images/under-img.jpg"
                            alt="cocktail"
                            width={1500}
                            height={1500}
                            className="abs-center masked-img size-full object-contain"
                        />
                    </div>

                    <ul className="space-y-4 will-fade">
                        {
                            featureLists.map((feature, index) => {
                                return (
                                    <li key={index} className="flex items-center justify-start gap-2">
                                        <Image
                                            src="/cocktail/images/check.png"
                                            alt="check"
                                            width={17}
                                            height={17}
                                        />
                                        <p className="md:w-fit w-60">{feature}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                <div className="masked-container">
                    <h2 className="will-fade">Sip-Worty Perfection</h2>

                    <div id="masked-content">
                        <h3>Made with Craft, Poured with Passion</h3>
                        <p>This isn&apos;t just a drink, It&apos;s a carefully crafted moment made just for</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
