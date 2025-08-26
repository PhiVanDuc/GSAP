"use client"

import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

import Image from "next/image";

import gsap from "gsap";
import { sliderLists } from "@/constants";

export default function Menu() {
    const contentRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useGSAP(() => {
        gsap.fromTo(
            "#title",
            {
                opacity: 0
            },
            {
                opacity: 1,
                duration: 1
            }
        );

        gsap.fromTo(
            ".details h2",
            {
                yPercent: 100,
                opacity: 0
            },
            {
                yPercent: 0,
                opacity: 1,
                ease: "power1.inOut"
            },
        )

        gsap.fromTo(
            ".details p",
            {
                yPercent: 100,
                opacity: 0
            },
            {
                yPercent: 0,
                opacity: 1,
                ease: "power1.inOut"
            },
        )

        gsap.fromTo(
            ".cocktail img",
            {
                opacity: 0,
                xPercent: -50
            },
            {
                opacity: 1,
                xPercent: 0,
                duration: 1,
                ease: "power1.inOut"
            }
        );
    }, [currentIndex]);

    const totalCocktails = sliderLists.length;

    const handleChangeCocktail = (index) => {
        const newIndex = (index + totalCocktails) % totalCocktails;
        setCurrentIndex(newIndex);
    }

    const getCocktailAt = (indexOffset) => {
        return sliderLists[(currentIndex + indexOffset + totalCocktails) % totalCocktails];
    }

    const prevCocktail = getCocktailAt(-1);
    const currentCocktail = getCocktailAt(0);
    const nextCocktail = getCocktailAt(1);

    return (
        <section id="menu" className="overflow-hidden">
            <nav className="cocktail-tabs">
                {
                    sliderLists.map((cocktail, index) => {
                        const isActive = index === currentIndex;

                        return (
                            <button
                                key={cocktail.id}
                                className={`${ isActive ? "text-white border-white" : "text-white/50 border-white/50" }`}
                                onClick={() => handleChangeCocktail(index)}
                            >
                                {cocktail.name}
                            </button>
                        )
                    })
                }
            </nav>

            <div className="content">
                <div className="arrows">
                    <button
                        className="text-left"
                        onClick={() => handleChangeCocktail(currentIndex - 1)}
                    >
                        <span>{prevCocktail.name}</span>

                        <Image
                            src="/cocktail/images/right-arrow.png"
                            alt="right-arrow"
                            width={35}
                            height={35}
                        />
                    </button>

                    <button
                        className="text-left"
                        onClick={() => handleChangeCocktail(currentIndex + 1)}
                    >
                        <span>{nextCocktail.name}</span>

                        <Image
                            src="/cocktail/images/left-arrow.png"
                            alt="left-arrow"
                            width={35}
                            height={35}
                        />
                    </button>
                </div>

                <div className="cocktail">
                    <Image
                        src={currentCocktail.image}
                        alt="cocktail"
                        width={800}
                        height={800}
                        className={`object-contain transition-opacity duration-500 ${isLoading && "opacity-0"}`}
                        onLoadingComplete={() => setIsLoading(false)}
                        key={currentIndex}
                    />
                </div>

                <div className="recipe">
                    <div
                        ref={contentRef}
                        className="info"
                    >
                        <p>Recipe for:</p>
                        <p id="title">{currentCocktail.name}</p>
                    </div>

                    <div className="details">
                        <h2>{currentCocktail.title}</h2>
                        <p>{currentCocktail.description}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
