"use client"

import { useRef } from "react";

export default function Features() {
    const featuresRef = useRef();

    return (
        <section
            ref={featuresRef}
            className="section-padding bg-black"
        >
            <div className="py-[120px]">
                <p className="font-circular-web text-lg text-blue-50">
                    Into the Metagame Layer
                </p>

                <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
                    Immerse yourself in a rich and ever-expanding universe where a vibrant
                    array of products converge into an interconnected overlay experience
                    on your world.
                </p>
            </div>
        </section>
    )
}
