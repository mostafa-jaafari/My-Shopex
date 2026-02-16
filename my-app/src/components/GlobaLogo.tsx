"use client";

import Link from "next/link";



export const GlobalLogo = () => {
    return (
        <Link
            href="/"
            className="relative w-max h-max -space-x-1 robik text-4xl font-bold primary-text cursor-pointer"
        >
            <span className="-space-x-3">
                <span>J</span>
                <span>B</span>
            </span>
            <span className="text-xs ml-0.5">eanz</span>
        </Link>
    )
}