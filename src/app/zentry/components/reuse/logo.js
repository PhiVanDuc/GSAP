"use client"

import { cn } from "@/utils/cn";

export default function Logo({
    size = 30,
    className = "",
    translateTop = "translate-x-[2px] translate-y-[5px]",
    translateDown = "translate-x-[-2px] translate-y-[-5px]"
}) {
    return (
        <div className={cn(
            "rotate-z-[12deg] w-fit h-fit",
            className
        )}>
            <div
                className={cn(
                    "zentry-logo-right aspect-square bg-blue-50",
                    translateTop
                )}
                style={{ width: `${size}px` }}
            />

            <div
                className={cn(
                    "zentry-logo-left aspect-square bg-blue-50",
                    translateDown
                )}
                style={{ width: `${size}px` }}
            />
        </div>
    )
}