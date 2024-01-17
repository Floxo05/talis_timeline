import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Timeline',
  description: 'Timeline for Tali',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className={"flex items-center justify-center h-screen bg-black text-white px-4"}>
          {children}
        </main>
      </body>
    </html>
  )
}
