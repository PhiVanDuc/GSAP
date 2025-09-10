"use client"

import { useRef } from "react";
import { cn } from "@/utils/cn";

export default function TiltedCard({
    children,
    className = ""
}) {
    const itemRef = useRef();

    const handleMouseMove = (event) => {
        if (!itemRef.current) return;

        const { left, top, width, height } = itemRef.current.getBoundingClientRect();
        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 5;
        const tiltY = (relativeX - 0.5) * -5;

        itemRef.current.style.transform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.96,.96,.96)`;
    };

    const handleMouseLeave = () => {
        if (!itemRef.current) return;
        itemRef.current.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    };

    return (
        <div
            ref={itemRef}
            className={cn(
                "h-[400px] cursor-pointer",
                "sm:h-[500px]",
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