import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { CaptionGeneratorForm } from "@/components/caption-generator-form"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Caption Generator",
  description: "Generate captions for your images",
}

export default async function Dashboard() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Caption Generator"
        text="Generate captions for your images"
      />
      <CaptionGeneratorForm />
    </DashboardShell>
  )
}
