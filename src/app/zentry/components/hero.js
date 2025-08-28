import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

import gsap from "gsap";

export default function Hero() {
    const expandVideoRef = useRef();

    const [isClicked, setIsClicked] = useState(false);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(1);

    useGSAP(
        () => {
            if (isClicked) {
                gsap.set(
                    ".expand-video",
                    { visibility: "visible" }
                );

                gsap.timeline()
                    .to(
                        ".expand-video",
                        {
                            width: "100%",
                            height: "100%",
                            transformOrigin: "center center",
                            duration: 1,
                            ease: "power1.inOut",
                            onStart: () => { expandVideoRef.current.play(); }
                        }
                    )
                    .set(
                        ".expand-video",
                        {
                            border: "none",
                            borderRadius: "0px"
                        }
                    );

                gsap.from(
                    ".preview-video",
                    {
                        transformOrigin: "center center",
                        scale: 0,
                        opacity: 0,
                        duration: 1.5,
                        ease: "power1.inOut",
                    }
                )
            }
        },
        {
            dependencies: [currentVideoIndex],
            revertOnUpdate: true
        }
    );

    useGSAP(() => {
        gsap.to(
            ".hero-video-box",
            {
                scrollTrigger: {
                    trigger: ".hero-video-box",
                    start: "top top",
                    end: "bottom 15%",
                    scrub: 1
                },
                keyframes: [
                    { clipPath: "polygon(7.5% 0, 92.5% 0, 96% 97.5%, 0 100%, 0 80%)" },
                    { clipPath: "polygon(10% 0, 85% 0, 92% 95%, 0 100%, 0 80%)" },
                    { clipPath: "polygon(12.5% 0, 77.5% 0, 88% 92.5%, 0 85%, 0 85%)" },
                    { clipPath: "polygon(15% 0, 70% 0, 84% 90%, 1% 82%, 1% 82%)" }
                ],
            }
        );
    }, []);

    const handleClickPreviewVideo = () => {
        setIsClicked(true);
        setCurrentVideoIndex(prev => prev + 1);
    }
    
    return (
        <div className="relative w-dvw h-dvh overflow-hidden">
            <div className="hero-video-box">
                <div className="group absolute-center preview-size cursor-pointer z-20">
                    <div className="size-full scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 origin-center transition-all duration-500 ease-in">
                        <div
                            className="preview-video size-full border-[2px] border-neutral-800 rounded-[15px] scale-200 overflow-hidden origin-center"
                            onClick={handleClickPreviewVideo}
                        >
                            <video
                                loop
                                muted
                                src="/zentry/videos/hero-1.mp4"
                                className="hero-video"
                            />
                        </div>
                    </div>
                </div>

                <video
                    ref={expandVideoRef}
                    muted
                    loop
                    playsInline
                    src="/zentry/videos/hero-1.mp4"
                    className="expand-video absolute-center preview-size border-[2px] border-neutral-800 rounded-[15px] invisible object-cover object-center z-10"
                />

                <video
                    muted
                    autoPlay
                    loop
                    playsInline
                    src="/zentry/videos/hero-1.mp4"
                    className="hero-video absolute top-0 left-0 z-0"
                />

                <p className="absolute font-zentry bottom-[20px] right-[50px] text-[205px] text-blue-50 font-bold leading-none z-10">GAMING</p>
            </div>

            <p className="absolute font-zentry bottom-[20px] right-[50px] text-[205px] font-bold leading-none -z-10">GAMING</p>
        </div>
    )
}