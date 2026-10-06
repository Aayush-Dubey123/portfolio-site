import { ThemeProvider } from "@/components/providers/theme-provider"
import { ThemeShortcut } from "@/components/providers/theme-shortcut"
import { PageViewAnalytics } from "@/components/site/analytics"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SITE_INFO, USER } from "@/data"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_INFO.url),
  alternates: {
    canonical: "/",
  },
  title: {
    template: "%s | Aayush Dubey",
    default: "Aayush Dubey | Software & Systems Engineer",
  },
  description: SITE_INFO.description,
  keywords: SITE_INFO.keywords,
  authors: [
    {
      name: "Aayush Dubey",
      url: SITE_INFO.url,
    },
  ],
  creator: "Aayush Dubey",
  publisher: "Aayush Dubey",
  openGraph: {
    siteName: "Aayush Dubey Portfolio",
    title: "Aayush Dubey | Software & Systems Engineer",
    description: SITE_INFO.description,
    url: SITE_INFO.url,
    type: "profile",
    firstName: USER.firstName,
    lastName: USER.lastName,
    username: USER.username,
    gender: "male",
    images: [
      {
        url: SITE_INFO.ogImage,
        width: 1200,
        height: 630,
        alt: "Aayush Dubey - Software & Systems Engineer Portfolio",
      },
    ],
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Aayush Dubey | Software & Systems Engineer",
    description: SITE_INFO.description,
    creator: "@Aayush-Dubey123",
    site: "@Aayush-Dubey123",
    images: [SITE_INFO.ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/android-chrome-192x192.png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
}

const personStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://ayushdubey.studio/#person",
      name: "Aayush Dubey",
      alternateName: "Aayush Chandrashekhar Dubey",
      url: "https://ayushdubey.studio",
      image: "https://ayushdubey.studio/assets/profile-aavatar.jpg",
      jobTitle: "Software & Systems Engineer",
      email: "mailto:aayushdubey2300@gmail.com",
      sameAs: [
        "https://www.linkedin.com/in/aayush-dubey-ab19a72b9/",
        "https://github.com/Aayush-Dubey123",
      ],
    },
    {
      "@type": "ProfilePage",
      "@id": "https://ayushdubey.studio/#profilepage",
      url: "https://ayushdubey.studio",
      name: "Aayush Dubey | Software & Systems Engineer",
      mainEntity: {
        "@id": "https://ayushdubey.studio/#person",
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} w-full antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
        <PageViewAnalytics />
        <TooltipProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="portfolio-theme"
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <ThemeShortcut />
          </ThemeProvider>
        </TooltipProvider>
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
      </body>
    </html>
  )
}
