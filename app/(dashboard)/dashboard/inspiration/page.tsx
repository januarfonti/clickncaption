import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { CaptionGeneratorForm } from "@/components/caption-generator-form"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import UnsplashForm from "@/components/unsplash-form"

export const metadata = {
  title: "Photo Inspiration",
  description: "Find inspiration for your photos",
}

export default async function Dashboard() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Inspiration"
        text="Find inspiration for your photos"
      />
      <UnsplashForm />
    </DashboardShell>
  )
}
