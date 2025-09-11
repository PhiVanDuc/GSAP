"use client"

import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Button = forwardRef(function Button(
    {
        type = "button",
        label = "Click me",
        icon,
        iconSide = "left",
        className = ""
    },
    ref
) {
    return (
        <button
            ref={ref}
            type={type}
            className={cn(
                "px-[25px] py-[12px] text-[12px] text-zinc-800 bg-yellow-300 rounded-full cursor-pointer",
                className
            )}
        >
            <div className='flex items-center gap-[8px]'>
                {(iconSide === "left" && icon) && (
                    <span className='translate-y-[-1.5px]'>{icon}</span>
                )}

                <span className='leading-none'>{label}</span>
                
                {(iconSide === "right" && icon) && (
                    <span className='translate-y-[-1.5px]'>{icon}</span>
                )}
            </div>
        </button>
    )
});

export default Button;