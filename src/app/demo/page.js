"use client"

import '@/app/styles/demo.css';

import { useEffect } from 'react'

export default function Page() {
    useEffect(() => {
        const card = document.querySelector(".card");

        document.addEventListener("mousemove", (e) => {
            const { innerWidth, innerHeight } = window;
            const x = e.clientX - innerWidth / 2;
            const y = e.clientY - innerHeight / 2;

            // chuẩn hóa thành -1 → 1
            const rotateX = (y / (innerHeight / 2));
            const rotateY = (x / (innerWidth / 2));

            // nhân hệ số để tạo góc xoay (max 60 độ)
            let angleX = rotateX * 50;
            let angleY = rotateY * 50;

            // Giới hạn max ±50 độ
            angleX = Math.max(-50, Math.min(50, angleX));
            angleY = Math.max(-50, Math.min(50, angleY));

            card.style.transform = `rotateX(${-angleX}deg) rotateY(${angleY}deg)`;
        });
    }, []);

    return (
        <div className="scene">
            <div className="card">Mặt trước</div>
        </div>
    )
}
