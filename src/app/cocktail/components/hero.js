"use client"

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

import Link from "next/link";
import Image from "next/image";

import gsap from "gsap";
import { SplitText } from "gsap/all";

export default function Hero() {
    const videoRef = useRef();
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const [src, setSrc] = useState("/cocktail/videos/output.mp4");

    useEffect(() => {
        setSrc(`/cocktail/videos/output.mp4?nocache=${Date.now()}`);
    }, []);

    useGSAP(() => {
        const heroSplit = new SplitText(".title", { type: "chars, words" });
        const paragraphSplit = new SplitText(".subtitle", { type: "lines" });
        
        heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));
        
        gsap.from(heroSplit.chars, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
        });
        
        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
            delay: 1,
        });
        
        gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        })
        .to(".right-leaf", { y: 200 }, 0)
        .to(".left-leaf", { y: -200 }, 0)

        const startValue = isMobile ? "top 50%" : "center 60%";
        // const endValue = isMobile ? "123% top" : "bottom top";

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: "video",
                start: startValue,
                end: "bottom top",
                scrub: true,
                pin: true,
            }
        });

        videoRef.current.onloadedmetadata = () => {
            tl.to(videoRef.current, {
                currentTime: videoRef.current.duration,
            })
        };
    }, []);

    return (
        <>
            <section
                id="hero"
                className="noisy"
            >
                <h1 className="title">MOJITO</h1>

                <Image
                    src="/cocktail/images/hero-left-leaf.png"
                    alt="left-leaf"
                    width={300}
                    height={300}
                    className="left-leaf"
                />

                <Image
                    src="/cocktail/images/hero-right-leaf.png"
                    alt="right-leaf"
                    width={300}
                    height={300}
                    className="right-leaf"
                />

                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>Cool. Crisp. Classic</p>

                            <p className="subtitle">
                                Sip the Spirit <br /> of Summer
                            </p>
                        </div>

                        <div className="view-cocktails">
                            <p className="subtitle">
                                Every cocktail on our menu is a blend of premium ingredients, creative flair and timeless recipes - designed to delight your senses.
                            </p>

                            <Link href="">View Cocktails</Link>
                        </div>
                    </div>
                </div>
            </section>

            <div className="video absolute inset-0 hidden md:block">
                <video
                    ref={videoRef}
                    muted
                    playsInline
                    preload="auto"
                    src={src}
                />
            </div>
        </>
    )
}