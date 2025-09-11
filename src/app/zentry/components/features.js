"use client"

import { useRef, useState } from "react";

import TiltedCard from "./reuse/tilted-card";
import { TiLocationArrow } from "react-icons/ti";

import { cn } from "@/utils/cn";

// Component chung cho các thẻ
function CardTemplate({
    src,
    title,
    desc,
    isComingSoon
}) {
    const hoverButtonRef = useRef(null);

    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [hoverOpacity, setHoverOpacity] = useState(0);

    const handleMouseMove = (event) => {
        if (!hoverButtonRef.current) return;
        const rect = hoverButtonRef.current.getBoundingClientRect();

        setCursorPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        });
    };

    const handleMouseEnter = () => setHoverOpacity(1);
    const handleMouseLeave = () => setHoverOpacity(0);

    return (
        <div className="relative size-full rounded-[15px] border border-zinc-700 overflow-hidden">
            <video
                src={src}
                loop
                muted
                autoPlay
                className="absolute left-0 top-0 size-full object-cover object-center"
            />

            <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
                {
                    (title && desc) && (
                        <div>
                            <h1 className="feature-card-title">{title}</h1>
                            <p
                                className={cn(
                                    "mt-3 max-w-64 text-xs",
                                    "md:text-base"
                                )}
                            >
                                {desc}
                            </p>
                        </div>
                    )
                }

                {
                    isComingSoon && (
                        <div
                            ref={hoverButtonRef}
                            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
                            onMouseMove={handleMouseMove}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div
                                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    opacity: hoverOpacity,
                                    background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
                                }}
                            />
                            <TiLocationArrow className="relative z-20" />
                            <p className="relative z-20">coming soon</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

// Component chính
export default function Features() {
    return (
        <section
            id="features"
            className="section-padding pb-[120px]"
        >
            <div className="py-[120px]">
                <p className="font-circular-web text-lg text-blue-50">
                    Into the Metagame Layer
                </p>

                <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
                    Immerse yourself in a rich and ever-expanding universe where a vibrant
                    array of products converge into an interconnected overlay experience
                    on your world.
                </p>
            </div>

            <div className="space-y-[20px]">
                <TiltedCard
                    className={cn(
                        "h-[400px]",
                        "sm:h-[500px]"
                    )}
                >
                    <CardTemplate
                        src="/zentry/videos/feature-1.mp4"
                        title={
                            <>
                                radia<b className="sepcial-zentry-font">n</b>t
                            </>
                        }
                        desc="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
                        isComingSoon={true}
                    />
                </TiltedCard>

                <div className={cn(
                    "grid grid-cols-1 gap-[20px]",
                    "sm:grid-cols-2"
                )}>
                    <TiltedCard className="sm:!h-full sm:row-span-2">
                        <CardTemplate
                            src="/zentry/videos/feature-2.mp4"
                            title={
                                <>
                                    zig<b className="sepcial-zentry-font">m</b>a
                                </>
                            }
                            desc="An anime and gaming-inspired NFT collection - the IP primed for expansion."
                            isComingSoon={true}
                        />
                    </TiltedCard>

                    <TiltedCard
                        className={cn(
                            "h-[400px]",
                            "sm:h-[500px]"
                        )}
                    >
                        <CardTemplate
                            src="/zentry/videos/feature-3.mp4"
                            title={
                                <>
                                    n<b className="sepcial-zentry-font">e</b>xus
                                </>
                            }
                            desc="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
                            isComingSoon={true}
                        />
                    </TiltedCard>

                    <TiltedCard
                        className={cn(
                            "h-[400px]",
                            "sm:h-[500px]"
                        )}
                    >
                        <CardTemplate
                            src="/zentry/videos/feature-4.mp4"
                            title={
                                <>
                                    az<b className="sepcial-zentry-font">u</b>l
                                </>
                            }
                            desc="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
                            isComingSoon={true}
                        />
                    </TiltedCard>

                    <TiltedCard
                        className={cn(
                            "h-[400px]",
                            "sm:h-[500px]"
                        )}
                    >
                        <div className={cn(
                            "flex size-full flex-col justify-between bg-violet-300 p-5 h-[400px] rounded-[15px]",
                            "sm:h-[500px]"
                        )}>
                            <h1 className="feature-card-title max-w-64 text-black">
                                M<b className="sepcial-zentry-font">o</b>re co<b className="sepcial-zentry-font">m</b>ing s<b className="sepcial-zentry-font">o</b>on.
                            </h1>

                            <TiLocationArrow className="m-5 scale-[5] self-end" />
                        </div>
                    </TiltedCard>

                    <TiltedCard
                        className={cn(
                            "h-[400px]",
                            "sm:h-[500px]"
                        )}
                    >
                        <video
                            src="/zentry/videos/feature-5.mp4"
                            loop
                            muted
                            autoPlay
                            className={cn(
                                "size-full object-cover object-center rounded-[15px] h-[400px]",
                                "sm:h-[500px]"
                            )}
                        />
                    </TiltedCard>
                </div>
            </div>
        </section>
    )
}