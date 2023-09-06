"use client"

import React, { FC, useEffect } from "react"
import { stagger, useAnimate } from "framer-motion"
import {
  CodeIcon,
  LanguagesIcon,
  ShareIcon,
  SparklesIcon,
  StarIcon,
  TimerIcon,
} from "lucide-react"

import { Icons } from "../icons"

const FeaturesSection: FC = () => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(
      "#transform-anim",
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.5, ease: "easeIn", delay: stagger(0.3) }
    )
  })
  return (
    <section
      ref={scope}
      id="features"
      className="space-y-6 py-8 md:py-12 lg:py-40"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2
          id="transform-anim"
          className="text-center text-3xl font-bold tracking-tight md:text-5xl md:leading-snug"
        >
          Features
        </h2>
        <p
          id="transform-anim"
          className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 lg:text-lg 2xl:text-xl"
        >
          Empower Your Social Media Presence with AI-Powered Magic - Unveiling
          ClicknCaption&apos;s Feature Set for Crafting Captivating Captions and
          Trending Hashtags
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <div
          id="transform-anim"
          className="relative overflow-hidden rounded-lg border bg-card p-2 text-card-foreground"
        >
          <div className="flex min-h-[180px] flex-col justify-between space-y-4 rounded-md p-6">
            <Icons.logo className="h-12 w-12 text-primary" />
            <div className="space-y-2">
              <h3 className="font-bold">AI-Powered Caption Generation</h3>
              <p className="text-sm text-muted-foreground">
                Create unique and engaging captions for your social media posts
                based on your inputted photo descriptions.
              </p>
            </div>
          </div>
        </div>
        <div
          id="transform-anim"
          className="relative overflow-hidden rounded-lg border bg-card p-2"
        >
          <div className="flex min-h-[180px] flex-col justify-between space-y-4 rounded-md p-6">
            <Icons.globe className="h-12 w-12 text-primary" />
            <div className="space-y-2">
              <h3 className="font-bold">Multi-Language Support</h3>
              <p className="text-sm text-muted-foreground">
                You have the power to choose your caption language. Currently,
                we support English and Indonesian, with more to come!
              </p>
            </div>
          </div>
        </div>
        <div
          id="transform-anim"
          className="relative overflow-hidden rounded-lg border bg-card p-2"
        >
          <div className="flex min-h-[180px] flex-col justify-between space-y-4 rounded-md p-6">
            <Icons.hashtag className="h-12 w-12 text-primary" />
            <div className="space-y-2">
              <h3 className="font-bold">Automated Hashtag Generation</h3>
              <p className="text-sm text-muted-foreground">
                Optimize your posts for maximum reach with our &quot;Generate
                Hashtag&quot; feature, creating relevant tags based on your
                photo&apos;s description.
              </p>
            </div>
          </div>
        </div>
        <div
          id="transform-anim"
          className="relative overflow-hidden rounded-lg border bg-card p-2"
        >
          <div className="flex min-h-[180px] flex-col justify-between space-y-4 rounded-md p-6">
            <Icons.settings className="h-12 w-12 text-primary" />
            <div className="space-y-2">
              <h3 className="font-bold">Customizable Outputs</h3>
              <p className="text-sm text-muted-foreground">
                Tailor your social media posts to your liking by adjusting the
                number of sentences in your caption and the number of hashtags
                generated.
              </p>
            </div>
          </div>
        </div>
        <div
          id="transform-anim"
          className="relative overflow-hidden rounded-lg border bg-card p-2"
        >
          <div className="flex min-h-[180px] flex-col justify-between space-y-4 rounded-md p-6">
            <Icons.lightbulb className="h-12 w-12 text-primary" />
            <div className="space-y-2">
              <h3 className="font-bold">Inspiration Feature</h3>
              <p className="text-sm text-muted-foreground">
                Stuck for ideas? Use the &quot;Cari Inspirasi&quot; feature to
                input a photo title and connect with the Unsplash API for a dose
                of inspiration.
              </p>
            </div>
          </div>
        </div>
        <div
          id="transform-anim"
          className="relative overflow-hidden rounded-lg border bg-card p-2"
        >
          <div className="flex min-h-[180px] flex-col justify-between space-y-4 rounded-md p-6">
            <Icons.monitor className="h-12 w-12 text-primary" />
            <div className="space-y-2">
              <h3 className="font-bold">User-friendly Interface</h3>
              <p className="text-sm text-muted-foreground">
                Our clean and intuitive UI makes generating captions and
                hashtags as easy as a few clicks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
