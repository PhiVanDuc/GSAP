"use client"

import Image from "next/image";
import Link from "next/link";

import { FaInfo } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";

export default function Card({ project }) {
    return (
        <div className="group relative w-full rounded-[15px] cursor-pointer">
            <Image
                src={project.img}
                alt={project.project}
                width={2000}
                height={2000}
                className="w-full object-cover object-center rounded-[15px]"
            />

            <div className="absolute top-[15px] bottom-[15px] left-[15px] card-buttons flex flex-col gap-[15px] md:gap-[20px] w-fit p-[10px] sm:p-[15px] md:p-[20px] bg-zinc-900/35 backdrop-blur rounded-[15px]">
                <Link
                    href={project.href}
                    className="flex items-center justify-center w-[35px] md:w-[40px] aspect-square rounded-full bg-white/35 hover:bg-white/45 backdrop-blur cursor-pointer transition-colors duration-300"
                >
                    <FaPlay className="text-white text-[12px] md:text-[14px]"/>
                </Link>

                <button
                    className="flex items-center justify-center w-[35px] md:w-[40px] aspect-square rounded-full bg-white/35 hover:bg-white/45 backdrop-blur cursor-pointer transition-colors duration-300"
                >
                    <FaInfo className="text-white text-[12px] md:text-[14px]"/>
                </button>
            </div>
        </div>
    )
}