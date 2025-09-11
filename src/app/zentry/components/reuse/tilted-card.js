"use client"

import { useRef } from "react";
import { cn } from "@/utils/cn";

export default function TiltedCard({
    children,
    className = "",
    tilt = 5
}) {
    const tiltedCardRef = useRef();

    const handleMouseMove = (event) => {
        if (!tiltedCardRef.current) return;

        const { left, top, width, height } = tiltedCardRef.current.getBoundingClientRect();
        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * tilt;
        const tiltY = (relativeX - 0.5) * -tilt;

        tiltedCardRef.current.style.transform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.96,.96,.96)`;
    };

    const handleMouseLeave = () => {
        if (!tiltedCardRef.current) return;
        tiltedCardRef.current.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    };

    return (
        <div
            ref={tiltedCardRef}
            className={cn(
                "cursor-pointer",
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: "perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
                transition: "transform 0.3s ease-out",
            }}
        >
            {children}
        </div>
    )
}