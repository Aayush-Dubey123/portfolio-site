"use client"

import { AdMonogram } from "@/components/profile"
import { NAV_ITEMS, USER } from "@/data"
import { cn } from "@/lib/utils"
import { ArrowLeft, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui"
import { ThemeSwitcher } from "./widgets"

/* =========================================================================
   CONTAINER WRAPPER
   ========================================================================= */

type ContainerWrapperProps = {
  children: React.ReactNode
  className?: string
}

export function ContainerWrapper({
  children,
  className,
}: ContainerWrapperProps) {
  return (
    <div className="mx-auto h-full w-full max-w-5xl px-4">
      <div className={cn("border-edge h-full border-x-[1px]", className)}>
        {children}
      </div>
    </div>
  )
}

/* =========================================================================
   BACK BUTTON
   ========================================================================= */

export function BackButton({ title, href }: { title: string; href: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-start gap-x-1 px-1 py-1 text-primary/90 transition-colors hover:text-primary"
    >
      <span className="flex size-6 items-center justify-center rounded-md transition-colors group-hover:bg-accent">
        <ArrowLeft className="size-4" />
      </span>
      <div className="border-edge border-b-[1px] px-2">
        <span className="text-base underline-offset-4 group-hover:underline">
          {title}
        </span>
      </div>
    </Link>
  )
}

/* =========================================================================
   SITE HEADER
   ========================================================================= */

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const activeUrl = "/" + pathname.split("/")[1]

  const handleHomeClick = (e: React.MouseEvent) => {
    setMobileMenuOpen(false)
    if (pathname === "/") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Close on Escape or click outside, and lock body scroll while open on mobile
  useEffect(() => {
    if (!mobileMenuOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false)
        buttonRef.current?.focus()
      }
    }

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false)
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    window.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [mobileMenuOpen])

  return (
    <header className="border-edge sticky top-0 z-50 h-12 w-full border-b-[1px] bg-background/80 backdrop-blur-xs">
      <ContainerWrapper className="">
        <nav className="z-50 mx-auto flex h-full w-full items-center justify-between px-2">
          {/* Desktop Nav (>= 900px) */}
          <div className="hidden h-full w-full items-center justify-between min-[900px]:flex">
            <Link
              href="/"
              onClick={handleHomeClick}
              aria-label="Home"
              className="flex items-center"
            >
              <AdMonogram className="size-8 sm:size-9" />
            </Link>
            <ul className="flex items-center gap-x-3">
              {NAV_ITEMS.map((item, index) => (
                <li key={index}>
                  <Button
                    variant="link"
                    asChild
                    className={cn(
                      "text-sm",
                      activeUrl === item.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    <Link
                      prefetch={false}
                      href={item.href}
                      onClick={(e) => {
                        if (pathname === "/") {
                          if (item.href === "/#about") {
                            e.preventDefault()
                            window.scrollTo({ top: 0, behavior: "smooth" })
                          } else if (item.href.startsWith("/#")) {
                            const id = item.href.slice(2)
                            const target = document.getElementById(id)
                            if (target) {
                              e.preventDefault()
                              target.scrollIntoView({ behavior: "smooth" })
                              window.history.pushState(null, "", `#${id}`)
                            }
                          }
                        }
                      }}
                      className="hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </Button>
                </li>
              ))}
              <ThemeSwitcher />
            </ul>
          </div>

          {/* Mobile / Tablet Header (< 900px) */}
          <div className="flex h-full w-full items-center justify-between min-[900px]:hidden">
            <Link
              href="/"
              onClick={handleHomeClick}
              aria-label="Home"
              className="flex items-center min-h-[44px] min-w-[44px]"
            >
              <AdMonogram className="size-8" />
            </Link>
            <div className="flex items-center gap-x-2">
              <ThemeSwitcher />
              <button
                ref={buttonRef}
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="hover:bg-accent/50 text-foreground flex min-h-[44px] min-w-[44px] size-11 cursor-pointer items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </ContainerWrapper>

      {/* Mobile Navigation Dropdown Menu & Backdrop (< 900px) */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-12 z-40 bg-background/60 backdrop-blur-xs min-[900px]:hidden"
            aria-hidden="true"
          />
          <div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation"
            className="border-edge bg-background/95 absolute top-12 left-0 z-50 w-full border-b shadow-lg backdrop-blur-md min-[900px]:hidden max-h-[calc(100svh-3rem)] overflow-y-auto"
          >
            <ul className="flex flex-col divide-y divide-border/40 px-4 py-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link
                    prefetch={false}
                    href={item.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false)
                      if (pathname === "/") {
                        if (item.href === "/#about") {
                          e.preventDefault()
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        } else if (item.href.startsWith("/#")) {
                          const id = item.href.slice(2)
                          const target = document.getElementById(id)
                          if (target) {
                            e.preventDefault()
                            target.scrollIntoView({ behavior: "smooth" })
                            window.history.pushState(null, "", `#${id}`)
                          }
                        }
                      }
                    }}
                    className="text-foreground/80 hover:text-foreground hover:bg-accent/30 flex min-h-[44px] w-full items-center rounded-md px-3 py-2.5 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </header>
  )
}

/* =========================================================================
   SITE FOOTER
   ========================================================================= */

export function SiteFooter() {
  return (
    <footer className="border-edge w-full border-b-[1px] py-3">
      <ContainerWrapper className="relative">
        <div className="py-0">
          <h3 className="text-muted-foreground px-4 text-center font-mono text-xs text-balance">
            Developed by{" "}
            <Button
              asChild
              variant="link"
              className="m-0 p-1 min-h-[44px] inline-flex items-center text-xs underline font-medium hover:text-primary transition-colors"
            >
              <a
                href={
                  USER.socials.find((s) => s.name.toLowerCase() === "github")
                    ?.href || "https://github.com/Aayush-Dubey123"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {USER.name}
              </a>
            </Button>{" "}
            • Build • Learn • Explore
          </h3>
        </div>
      </ContainerWrapper>
    </footer>
  )
}

/* =========================================================================
   RE-EXPORT WIDGETS
   ========================================================================= */

export * from "./widgets"
