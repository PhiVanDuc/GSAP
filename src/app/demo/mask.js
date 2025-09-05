"use client"

export default function Mask() {
    return (
        <div className="overflow-y-auto overflow-x-hidden">
            <div className="p-[20px] grid grid-cols-2 gap-[20px]">
                {/* Dùng ảnh mask ảnh */}
                <div className="p-[20px] flex flex-col gap-[10px] bg-zinc-100 hover:bg-zinc-200 rounded-[10px] cursor-pointer transition-colors">
                    <p className="uppercase text-zinc-700 font-bold">Dùng ảnh mask ảnh</p>

                    <img
                        alt="Masked Image"
                        src="/zentry/img/contact-1.webp"
                        className="mask-with-image w-full object-cover object-center rounded-[10px]"
                    />
                </div>

                {/* Dùng svg mask ảnh */}
                <div className="p-[20px] flex flex-col gap-[10px] bg-zinc-100 hover:bg-zinc-200 rounded-[10px] cursor-pointer transition-colors">
                    <p className="uppercase text-zinc-700 font-bold">Dùng svg mask ảnh</p>

                    <div className="w-full flex-1">
                        <svg
                            width="100%"
                            height="100%"
                        >
                            <mask id="svg-mask" >
                                <rect
                                    x="20%"
                                    y="20%"
                                    rx="10"
                                    width="60%"
                                    height="60%"
                                    fill="white"
                                />
                            </mask>

                            <image
                                href="/zentry/img/contact-1.webp"
                                className="mask-with-svg size-full object-cover object-center"
                                width="100%"
                                height="100%"
                                mask="url(#svg-mask)"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}