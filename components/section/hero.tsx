"use client"

import { FC, useEffect } from "react"
import Link from "next/link"
import { stagger, useAnimate } from "framer-motion"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const HeroSection: FC = () => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(
      "#transform-anim",
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.5, ease: "easeIn", delay: stagger(0.3) }
    )
  })

  return (
    <section className="container mt-[5vh] md:mt-[10vh]">
      <div
        ref={scope}
        className="relative flex flex-col items-center justify-center gap-y-24"
      >
        <div className="flex flex-col items-center justify-center">
          <h1
            id="transform-anim"
            className="text-center text-3xl font-bold tracking-tight md:text-6xl md:leading-snug"
          >
            Unleash your social media potential
            <br className="md:block" />
            with <span className="text-primary">Click N Caption</span>
          </h1>
          <p
            id="transform-anim"
            className="my-4 max-w-lg text-center text-muted-foreground lg:max-w-xl lg:text-lg 2xl:text-xl"
          >
            This AI-powered app crafts personalized captions and tags from your
            photo descriptions, making your posts stand out with minimal effort.
          </p>
          <div className="flex gap-4">
            <Link
              id="transform-anim"
              href="/dashboard"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Try me
            </Link>
            <Link
              id="transform-anim"
              target="_blank"
              href="https://github.com/januarfonti/click-n-caption"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Github
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
