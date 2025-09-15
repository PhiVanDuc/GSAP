"use client"

import Image from "next/image";

import { FaInfo } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";

export default function Card({ project }) {
    const handleChangeDirection = (path) => {
        if (!path) return;
        window.location.href = path;
    }

    return (
        <div className="group relative w-full rounded-[15px]">
            <Image
                title={project.project}
                src={project.img}
                alt={project.project}
                width={2000}
                height={2000}
                className="w-full h-auto object-cover object-center rounded-[15px]"
            />

            <div className="absolute top-[15px] left-[15px] card-buttons flex flex-col gap-[15px] md:gap-[20px] w-fit p-[10px] sm:p-[15px] md:p-[20px] bg-zinc-900/35 backdrop-blur rounded-[15px]">
                <button
                    title={project.project}
                    type="button"
                    className="flex items-center justify-center w-[35px] md:w-[40px] aspect-square rounded-full bg-white/35 hover:bg-white/45 backdrop-blur cursor-pointer transition-colors duration-300"
                    onClick={() => { handleChangeDirection(project.href) }}
                >
                    <FaPlay className="text-white text-[12px] md:text-[14px]"/>
                </button>

                <button
                    title="Thông tin"
                    type="button"
                    className="flex items-center justify-center w-[35px] md:w-[40px] aspect-square rounded-full bg-white/35 hover:bg-white/45 backdrop-blur cursor-pointer transition-colors duration-300"
                    onClick={() => { handleChangeDirection(project.href) }}
                >
                    <FaInfo className="text-white text-[12px] md:text-[14px]"/>
                </button>
            </div>
        </div>
    )
}