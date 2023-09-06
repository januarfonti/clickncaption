import Link from "next/link"

import { publicConfig } from "@/config/public"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { MainNav } from "@/components/main-nav"
import { UserAccountNav } from "@/components/user-account-nav"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const user = await getCurrentUser()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/80 shadow-sm backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={publicConfig.mainNav} />
          {user ? (
            <UserAccountNav
              user={{
                name: user.name,
                email: user.email,
                image: user.image,
              }}
            />
          ) : (
            <nav>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "px-4"
                )}
              >
                Login
              </Link>
            </nav>
          )}
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
