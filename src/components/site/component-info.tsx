"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

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
