import { Toaster } from "@/components/ui/toaster"

import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Next.js", "Tailwind CSS", "React", "Open AI"],
  creator: siteConfig.author,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
      {process.env.NODE_ENV === "production" && (
        <>
          <Script
            async
            src="https://analytics.fonti.dev/script.js"
            data-website-id="71a659df-7e7f-481a-af64-4640ff56068b"
            strategy="lazyOnload"
          />
        </>
      )}
    </html>
  )
}
