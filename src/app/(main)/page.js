import { Inter } from "next/font/google";

import Card from "./components/card";
import { projectList } from "@/constants/main";

const inter = Inter({
    subsets: ["latin", "vietnamese"]
});

export default function Page() {
    return (
        <section className={`${inter.className} text-zinc-800 py-[20px] md:py-[40px] px-[20px] md:px-[40px]`}>
            <header className="space-y-[10px] mb-[80px]">
                <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase'>Awwwards</h1>
                <p className='text-zinc-600 font-medium'>Danh sách các dự án Awwwards - Xây dựng hiệu ứng với GSAP.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px] md:gap-[20px] lg:gap-[30px]">
                {
                    projectList.map((project, index) => {
                        return (
                            <Card
                                key={index}
                                project={project}
                            />
                        )
                    })
                }
            </div>
        </section>
    )
}
