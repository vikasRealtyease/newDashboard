import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@realtyeaseai/ui";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Manager Dashboard | RealtyEaseAI",
    description: "Manage your projects, tasks, and payments.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
