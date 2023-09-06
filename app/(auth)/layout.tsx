import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-3 lg:grid-cols-2">
      <AspectRatio ratio={16 / 9}>
        <Image
          src="/images/auth-bg.png"
          alt="A bot creating an application"
          fill
          className="absolute inset-0 object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60 md:to-background/40" />
      </AspectRatio>
      <main className="container absolute top-1/2 col-span-1 my-10 flex -translate-y-1/2 items-center md:static md:top-0 md:col-span-2 md:my-0 md:flex md:translate-y-0 lg:col-span-1">
        {children}
      </main>
    </div>
  )
}
