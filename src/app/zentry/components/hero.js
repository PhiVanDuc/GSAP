import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { TiLocationArrow } from "react-icons/ti";

import gsap from "gsap";
import clsx from "clsx";

export default function Hero() {
    const expandVideoRef = useRef();
    const backgroundVideoRef = useRef();
    const cooldownRef = useRef(false);

    const [isClicked, setIsClicked] = useState(false);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(1);
    const isMobileScreen = useMediaQuery({ maxWidth: 767 });

    const totalVideos = 4;
    const getLinkVideo = (index) => `/zentry/videos/hero-${index}.mp4`;
    
    useGSAP(
        () => {
            if (isClicked) {
                gsap.set(
                    ".expand-video",
                    { visibility: "visible" }
                );

                gsap.timeline({
                    onComplete: () => {
                        backgroundVideoRef.current.src = getLinkVideo(currentVideoIndex);

                        backgroundVideoRef.current.addEventListener("loadedmetadata", function syncTime() {
                            backgroundVideoRef.current.currentTime = expandVideoRef.current.currentTime;
                            backgroundVideoRef.current.play();
                            backgroundVideoRef.current.removeEventListener("loadedmetadata", syncTime);
                        });
                    }
                })
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
                            borderRadius: "0px",
                            duration: 0,
                            ease: "none"
                        }
                    );

                if (!isMobileScreen) {
                    gsap.from(
                        ".preview-video",
                        {
                            transformOrigin: "center center",
                            scale: 0,
                            opacity: 0,
                            duration: 1
                        }
                    )
                }
                
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
        if (cooldownRef.current) return;
        cooldownRef.current = true;

        setIsClicked(true);
        setCurrentVideoIndex((prev) => (prev % totalVideos) + 1);

        setTimeout(() => { cooldownRef.current = false }, 1500);
    }

    const handleMouseEnter = (e) => {
        gsap.to(
            e.target, {
                height: "56px",
                clipPath: 'path("M 10,0 L 170,10 A 10,10 0,0,1 180,20 L 180,46 A 10,10 0,0,1 170,56 L 10,56 A 10,10 0,0,1 0,46 L 0,10 A 10,10 0,0,1 10,0 Z")',
                duration: 0.3,
                ease: "power1.inOut"
            }
        );

        gsap.to(
            ".hero-button-content",
            {
                marginBottom: "-8px",
                duration: 0.3,
                ease: "power1.inOut"
            }
        );
    }

    const handleMouseLeave = (e) => {
        gsap.to(
            e.target,
            {
                height: "46px",
                clipPath: 'path("M 10,0 L 170,0 A 10,10 0,0,1 180,10 L 180,36 A 10,10 0,0,1 170,46 L 10,46 A 10,10 0,0,1 0,36 L 0,10 A 10,10 0,0,1 10,0 Z")',
                duration: 0.3,
                ease: "power1.inOut"
            }
        );

        gsap.to(
            ".hero-button-content",
            {
                marginBottom: "0px",
                duration: 0.3,
                ease: "power1.inOut"
            }
        );
    }
    
    return (
        <div className="relative w-dvw h-dvh overflow-hidden">
            <div className="group absolute-center preview-size z-20">
                <div className="preview-video-wrapper">
                    <div
                        className="preview-video"
                        onClick={handleClickPreviewVideo}
                    >
                        <video
                            preload="auto"
                            src={getLinkVideo((currentVideoIndex % totalVideos) + 1)}
                            className="hero-video scale-150"
                        />
                    </div>
                </div>
            </div>
            
            <div className="hero-video-box">
                <video
                    ref={expandVideoRef}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    src={getLinkVideo(currentVideoIndex)}
                    className="expand-video"
                />

                <video
                    ref={backgroundVideoRef}
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="auto"
                    src="/zentry/videos/hero-1.mp4"
                    className="hero-video absolute top-0 left-0 z-0"
                />

                <header className="hero-content">
                    <h1 className={clsx(
                        "hero-header text-blue-50 mb-[15px]",
                        "lg:mb-[5px]"
                    )}>
                        REDEFI<b className="special-zentry-font">N</b>E
                    </h1>

                    <p className={clsx(
                        "font-robert-regular mb-[30px] text-blue-100 text-center sm:text-left",
                        "sm:text-[18px]"
                    )}>
                        Enter the Metagame <br />
                        Unleash the Play Economy
                    </p>

                    <button
                        className="hero-button text-xs text-zinc-800 font-medium uppercase cursor-pointer"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="hero-button-content flex items-center gap-[8px]">
                            <TiLocationArrow size={20} />
                            <span>watch trailer</span>
                        </div>
                    </button>
                </header>

                <h2 className="hero-mask-header text-blue-50 z-10">G<b>A</b>MING</h2>
            </div>

            <h2 className="hero-mask-header text-zinc-800 -z-10">G<b>A</b>MING</h2>
        </div>
    )
}