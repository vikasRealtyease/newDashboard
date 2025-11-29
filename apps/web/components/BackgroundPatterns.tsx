import React from "react";

export function DotPattern({ className }: { className?: string }) {
    return (
        <div className={`absolute inset-0 -z-10 h-full w-full bg-white ${className}`}>
            <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>
    );
}

export function GridPattern({ className }: { className?: string }) {
    return (
        <div className={`absolute inset-0 -z-10 h-full w-full bg-white ${className}`}>
            <div className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>
    );
}
