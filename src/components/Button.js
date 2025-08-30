"use client"

export default function Button(
    {
        label = "",
        id = "",
        className = "",
        rightIcon,
        leftIcon,
        ...props
    }
) {
    return (
        <button
            id={id}
            className={`group relative flex items-center gap-[10px] w-fit cursor-pointer overflow-hidden px-7 py-3 bg-violet-50 rounded-[99px] text-black font-medium ${className}`}
            {...props}
        >
            { leftIcon && leftIcon }

            <span className="relative inline-flex text-xs uppercase overflow-hidden">
                {label}
            </span>

            { rightIcon && rightIcon }
        </button>
    )
}
