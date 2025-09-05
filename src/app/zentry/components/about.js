import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

export default function About() {
    const aboutImageWrapperRef = useRef();

    useGSAP(() => {
        const descSplit = SplitText.create(
            ".about-header .desc",
            { type: "words" }
        );

        const titleSplit = SplitText.create(
            ".about-header .title",
            { type: "words" }
        );

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-header",
                start: "50% bottom",
                toggleActions: "restart none none reset",
            }
        });

        tl.from(descSplit.words, {
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
        });

        tl.to(".about-header .title", {
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power3.out",
        }, "<");

        tl.from(titleSplit.words, {
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
        }, "<");
    }, []);

    useGSAP(() => {
        const wrapper = aboutImageWrapperRef.current;
        if (!wrapper) return;

        let tween;

        const handleResize = () => {
            if (tween) tween.kill();

            const width = wrapper.offsetWidth;
            const height = wrapper.offsetHeight;

            let finalWidth = 400;
            const finalHeight = finalWidth * 1.5;

            const x1 = ((width / 2) - (finalWidth / 2));
            const x2 = ((width / 2) - (finalWidth / 2)) + finalWidth;
            const y1 = 0;
            const y2 = finalHeight;

            const r = 10;

            const startPath = `path("M ${x1} ${y1 + r} A ${r} ${r} 0 0 1 ${x1 + r} ${y1} L ${x2 - r} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y1 + r} L ${x2} ${y2 - r} A ${r} ${r} 0 0 1 ${x2 - r} ${y2} L ${x1 + r} ${y2} A ${r} ${r} 0 0 1 ${x1} ${y2 - r} L ${x1} ${y1 + r} Z")`;

            const endPath = `path("M ${0} ${0} A ${r} ${r} 0 0 1 ${0} ${0} L ${width} ${0} A ${r} ${r} 0 0 1 ${width} ${0} L ${width} ${height} A ${r} ${r} 0 0 1 ${width} ${height} L ${0} ${height} A ${r} ${r} 0 0 1 ${0} ${height} L ${0} ${0} Z")`;

            tween = gsap.fromTo(
                wrapper,
                {
                    clipPath: startPath,
                    scale: 0.8
                },
                {
                    scrollTrigger: {
                        trigger: "#about-content",
                        start: "top top",
                        end: "80% top",
                        scrub: 0.3,
                        pin: true
                    },
                    clipPath: endPath,
                    scale: 1
                }
            )
        }

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    return (
        <section className="about">
            <header
                className="about-header space-y-[40px] pt-[120px] pb-[20px] text-zinc-900 text-center uppercase"
                style={{ perspective: "2000px" }}
            >
                <p className="desc text-[11px]">welcome to zentry</p>
                <h2
                    className="title text-[90px] font-zentry leading-none origin-center rotate-x-[-40deg] rotate-y-[-70deg] rotate-z-[-45deg] translate-x-[-200px] translate-y-[100px]"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    Discover the world's <br />
                    largest shared adventure.
                </h2>
            </header>

            <div
                id="about-content"
                className="relative h-dvh"
            >
                <div
                    ref={aboutImageWrapperRef}
                    className="absolute w-dvw h-full"
                >
                    <img
                        src="/zentry/img/about.webp"
                        alt="About Image"
                        className="size-full object-cover object-center"
                    />
                </div>
            </div>
        </section>
    )
}