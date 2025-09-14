import { useGSAP } from "@gsap/react";
import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

import { TiLocationArrow } from "react-icons/ti";
import Button from "@/app/zentry/components/reuse/button";
import Loading from "@/app/zentry/components/reuse/loading";

import gsap from "gsap";
import { cn } from "@/utils/cn";

export default function Hero() {
    const heroExpandVideoRef = useRef();
    const heroBackgroundVideoRef = useRef();
    const cooldownRef = useRef(false);

    const [isClicked, setIsClicked] = useState(false);
    const [isLoadVideo, setIsLoadVideo] = useState(true);
    const [loadedVideoCount, setLoadedVideoCount] = useState(0);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(1);
    const [dateCache, setDateCache] = useState("");
    const isMobileScreen = useMediaQuery({ maxWidth: 767 });

    const totalVideos = 4;
    const totalVideosNeedLoad = 3;
    const getLinkVideo = (index) => `/zentry/videos/hero-${index}.mp4${dateCache}`;

    useEffect(() => {
        if (loadedVideoCount >= totalVideosNeedLoad) {
            setIsLoadVideo(false);
            setLoadedVideoCount(0);
        }
    }, [loadedVideoCount]);

    useEffect(() => {
        setDateCache(`?nocache=${Date.now()}`);
    }, []);

    useGSAP(
        () => {
            if (isClicked) {
                gsap.set(
                    "#hero-expand-video",
                    { visibility: "visible" }
                );

                gsap.timeline({
                    onComplete: () => {
                        heroBackgroundVideoRef.current.src = getLinkVideo(currentVideoIndex);

                        heroBackgroundVideoRef.current.addEventListener("loadedmetadata", function syncTime() {
                            heroBackgroundVideoRef.current.currentTime = heroExpandVideoRef.current.currentTime;
                            heroBackgroundVideoRef.current.play();
                            heroBackgroundVideoRef.current.removeEventListener("loadedmetadata", syncTime);
                        });
                    }
                })
                    .to(
                        "#hero-expand-video",
                        {
                            width: "100%",
                            height: "100%",
                            transformOrigin: "center center",
                            duration: 1,
                            ease: "power1.inOut",
                            onStart: () => { heroExpandVideoRef.current.play(); }
                        }
                    )
                    .set(
                        "#hero-expand-video",
                        {
                            border: "none",
                            borderRadius: "0px",
                            duration: 0,
                            ease: "none"
                        }
                    );

                if (!isMobileScreen) {
                    gsap.from(
                        "#hero-preview-video",
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
            "#hero-video-box",
            {
                scrollTrigger: {
                    trigger: "#hero-video-box",
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
        setTimeout(() => { cooldownRef.current = false }, 1000);
    }

    const handleVideoLoading = () => {
        setLoadedVideoCount(prev => prev + 1);
    }
    
    return (
        <section className="relative h-dvh overflow-hidden">
            <Loading isLoading={isLoadVideo && (loadedVideoCount < totalVideosNeedLoad)} />

            <div className="group absolute-center hero-preview-size z-20">
                <div className={cn(
                    "size-full origin-center transition-all duration-500 ease-out",
                    "md:scale-0 md:group-hover:scale-100 md:opacity-0 md:group-hover:opacity-100"
                )}>
                    <div
                        id="hero-preview-video"
                        className="size-full border border-zinc-800 bg-white rounded-[15px] cursor-pointer overflow-hidden"
                        onClick={handleClickPreviewVideo}
                    >
                        <video
                            preload="auto"
                            src={getLinkVideo((currentVideoIndex % totalVideos) + 1)}
                            className="size-full object-cover object-center scale-150"
                            onLoadedData={handleVideoLoading}
                        />
                    </div>
                </div>
            </div>
            
            <div
                id="hero-video-box"
                className="relative w-full h-full border border-neutral-800 overflow-hidden"
                style={{
                    clipPath: "polygon(0 0%, 100% 0, 100% 100%, 0 100%)"
                }}
            >
                <video
                    ref={heroExpandVideoRef}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    src={getLinkVideo(currentVideoIndex)}
                    id="hero-expand-video"
                    className="absolute-center hero-preview-size border border-zinc-800 bg-zinc-500 rounded-[15px] invisible object-cover object-center z-10"
                    onLoadedData={handleVideoLoading}
                />

                <video
                    ref={heroBackgroundVideoRef}
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="auto"
                    src={getLinkVideo(1)}
                    className="absolute top-0 left-0 size-full object-cover object-center z-0"
                    onLoadedData={handleVideoLoading}
                />

                <header className={cn(
                    "flex flex-col items-center absolute top-[100px] bottom-[40px] left-[20px] right-[20px] z-10",
                    "sm:items-start sm:bottom-auto sm:left-[40px] sm:right-0"
                )}>
                    <h1 className={cn(
                        "hero-header text-blue-50 mb-[15px]",
                        "lg:mb-[5px]"
                    )}>
                        REDEFI<b className="special-zentry-font">N</b>E
                    </h1>

                    <p className={cn(
                        "font-robert-regular mb-[30px] text-blue-100 text-center",
                        "sm:text-[18px] sm:text-left"
                    )}>
                        Enter the Metagame <br />
                        Unleash the Play Economy
                    </p>

                    <Button
                        label="watch trailer"
                        icon={<TiLocationArrow size={18} />}
                        className={cn(
                            "mt-auto uppercase",
                            "sm:mt-0"
                        )}
                    />
                </header>

                <h2 className={cn(
                    "hero-header hidden absolute bottom-[20px] right-[50px] text-blue-50 z-10",
                    "sm:block"
                )}>
                    G<b className="special-zentry-font">A</b>MING
                </h2>
            </div>

            <h2 className={cn(
                "hero-header hidden absolute bottom-[20px] right-[50px] text-zinc-800 -z-10",
                "sm:block"
            )}>
                G<b className="special-zentry-font">A</b>MING
            </h2>
        </section>
    )
}