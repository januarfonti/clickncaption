import { User } from "@prisma/client"
import type { Icon } from "lucide-react"

import { Icons } from "@/components/icons"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
  author: string
}

export type PublicConfig = {
  mainNav: MainNavItem[]
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
}

export type UnsplashImageResponse = {
  id: string
  width: number
  height: number
  alt_description: string
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
}
