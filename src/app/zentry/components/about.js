import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import Image from "next/image";
import AnimatedDesc from "./reuse/animated-desc";
import AnimatedHeading from "./reuse/animated-heading";

import gsap from "gsap";
import { cn } from "@/utils/cn";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function About() {
    const aboutImageRef = useRef();
    const aboutImageDescRef = useRef();

    const calcClipPathAboutImage = (element) => {
        const width = element.offsetWidth;

        let finalWidth =
            width >= 1024 ? 400 :
            width >= 768 ? 350 :
            width >= 640 ? 300 :
            250;

        const finalHeight = finalWidth * 1.5;
        aboutImageDescRef.current.style.top = `${finalHeight + 80}px`;

        const x1 = (width - finalWidth) / 2;
        const x2 = x1 + finalWidth;
        const y1 = 0;
        const y2 = finalHeight;

        const r = 10;

        return `path("M ${x1} ${y1 + r} A ${r} ${r} 0 0 1 ${x1 + r} ${y1} L ${x2 - r} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y1 + r} L ${x2} ${y2 - r} A ${r} ${r} 0 0 1 ${x2 - r} ${y2} L ${x1 + r} ${y2} A ${r} ${r} 0 0 1 ${x1} ${y2 - r} L ${x1} ${y1 + r} Z")`;
    }

    useGSAP(() => {
        if (!aboutImageRef.current || !aboutImageDescRef.current) return;

        let tween, timeout;

        const handleAnimation = () => {
            if (tween) {
                if (tween.scrollTrigger) tween.scrollTrigger.kill();
                tween.kill();
                tween = undefined;
            }

            const width = aboutImageRef.current.offsetWidth;
            const height = aboutImageRef.current.offsetHeight
            const r = 10;

            const startPath = calcClipPathAboutImage(aboutImageRef.current);
            const endPath = `path("M ${0} ${0} A ${r} ${r} 0 0 1 ${0} ${0} L ${width} ${0} A ${r} ${r} 0 0 1 ${width} ${0} L ${width} ${height} A ${r} ${r} 0 0 1 ${width} ${height} L ${0} ${height} A ${r} ${r} 0 0 1 ${0} ${height} L ${0} ${0} Z")`;

            aboutImageRef.current.style.clipPath = startPath;
            aboutImageRef.current.style.webkitClipPath = startPath;

            tween = gsap.to(
                aboutImageRef.current,
                {
                    clipPath: endPath,
                    scale: 1,
                    scrollTrigger: {
                        trigger: ".about-content",
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                        pin: true
                    }
                }
            );
        }

        handleAnimation();

        const handleResize = () => {
            if (timeout) {
                clearTimeout(timeout);
                timeout = undefined;
            }

            timeout = setTimeout(() => {
                handleAnimation();
                ScrollTrigger.refresh();
            }, 500);
        }

        window.addEventListener("resize", handleResize);

        return () => {
            if (tween) {
                tween.kill();
                tween = undefined;
            }

            if (timeout) {
                clearTimeout(timeout);
                timeout = undefined;
            }

            window.removeEventListener("resize", handleResize);
        }
    }, []);

    return (
        <section className="about overflow-hidden">
            <header
                className="about-header space-y-[40px] pt-[120px] mb-[20px] text-center uppercase"
                style={{ perspective: "1000px" }}
            >
                <AnimatedDesc
                    desc="welcome to zentry"
                    triggerQuery=".about-header"
                />

                <AnimatedHeading
                    heading={["discover the world's", "largest shared adventure."]}
                    triggerQuery=".about-header"
                    delay={0.3}
                />
            </header>

            <div className="about-content relative h-screen">
                <Image
                    ref={aboutImageRef}
                    src="/zentry/img/about.webp"
                    alt="About Image"
                    width="2000"
                    height="2000"
                    className="absolute top-0 left-0 size-full object-cover object-center scale-90 z-10"
                />

                <div
                    ref={aboutImageDescRef}
                    className="absolute left-0 right-0 flex flex-col items-center gap-[5px] px-[20px] text-[16px] text-center z-0"
                >
                    <p className="font-medium">The Metagame begins - your life, now an epic MMORPG</p>
                    <p className={cn(
                        "text-zinc-500",
                        "md:max-w-[580px]"
                    )}>
                        Zentry is a unified play layer that bridges players, agentic AI, and blockchains, creating a new economic paradigm.
                    </p>
                </div>
            </div>
        </section>
    )
}