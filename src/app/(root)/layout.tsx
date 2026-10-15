import { SiteFooter, SiteHeader } from "@/components/site"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SiteHeader />
      <main className="w-full overflow-x-hidden">{children}</main>
      <SiteFooter />
    </>
  )
}
