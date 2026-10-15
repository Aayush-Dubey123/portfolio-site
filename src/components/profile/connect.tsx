"use client"

import { useState, useEffect } from "react"
import { HeaderTitle } from "./header-title"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Loader2, Send, AlertCircle } from "lucide-react"
import { toast } from "sonner"

const QUICK_INTERESTS = [
  "Full-Stack Collaboration",
  "Cloud & DevOps Architecture",
  "AI & MCP Systems",
  "Software Engineering Opportunity",
]

export function Connect() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [interest, setInterest] = useState("")
  const [message, setMessage] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [formStartedAt, setFormStartedAt] = useState<number>(0)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    setFormStartedAt(Date.now())
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null)

    const trimmedName = name.trim()
    const trimmedInterest = interest.trim()
    const trimmedMessage = message.trim()
    const trimmedEmail = email.trim()

    if (!trimmedName) {
      setErrorMessage("Please enter your name.")
      return
    }

    if (!trimmedInterest) {
      setErrorMessage("Please share what interested you or what you'd like to discuss.")
      return
    }

    if (!trimmedMessage || trimmedMessage.length < 5) {
      setErrorMessage("Please enter a message with at least 5 characters.")
      return
    }

    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          interest: trimmedInterest,
          message: trimmedMessage,
          website_hp: honeypot,
          formStartedAt,
        }),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.success) {
        const errorText =
          result?.error || "Failed to send message. Please try again or reach out via Gmail."
        setErrorMessage(errorText)
        toast.error(errorText)
        return
      }

      setIsSuccess(true)
      setName("")
      setEmail("")
      setInterest("")
      setMessage("")
      toast.success("Message sent! I'll get back to you soon.")
    } catch (err) {
      console.error("Submission error:", err)
      const fallbackErr = "Network error. Please try again or reach out directly via Gmail."
      setErrorMessage(fallbackErr)
      toast.error(fallbackErr)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setIsSuccess(false)
    setErrorMessage(null)
    setFormStartedAt(Date.now())
  }

  return (
    <section id="connect" className="w-full scroll-mt-16">
      <HeaderTitle title="Let’s Connect" id="connect-heading" />
      <div className="p-3 sm:p-5">
        <div className="mb-4">
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Have a project in mind, an opportunity, or a shared interest in cloud architecture, full-stack systems, or AI tooling? Send a direct message below.
          </p>
        </div>

        {isSuccess ? (
          <div className="border-edge bg-muted/40 rounded-lg border p-5 sm:p-6 text-center space-y-3 transition-all">
            <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20">
              <CheckCircle2 className="size-6" />
            </div>
            <h3 className="text-primary font-semibold text-base sm:text-lg">
              Message Delivered!
            </h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Thank you for reaching out. Your note has been received and routed to{" "}
              <span className="font-mono text-xs text-primary">aayushdubey2300@gmail.com</span>. I&apos;ll get back to you promptly.
            </p>
            <div className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="text-xs"
              >
                Send Another Message
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot field for bot suppression */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website_hp">Leave this empty</label>
              <input
                id="website_hp"
                type="text"
                name="website_hp"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="text-primary text-xs font-medium uppercase tracking-wider block"
                >
                  Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  disabled={isSubmitting}
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-edge bg-background/50 focus:border-ring focus:ring-ring/20 text-primary placeholder:text-muted-foreground/60 w-full rounded-md border px-3 py-2 text-sm transition-colors focus:ring-2 focus:outline-none disabled:opacity-50"
                />
              </div>

              {/* Email / Contact */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-primary text-xs font-medium uppercase tracking-wider block"
                >
                  Email <span className="text-muted-foreground text-[11px] font-normal lowercase">(for reply)</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  disabled={isSubmitting}
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-edge bg-background/50 focus:border-ring focus:ring-ring/20 text-primary placeholder:text-muted-foreground/60 w-full rounded-md border px-3 py-2 text-sm transition-colors focus:ring-2 focus:outline-none disabled:opacity-50"
                />
              </div>
            </div>

            {/* Interest */}
            <div className="space-y-1.5">
              <label
                htmlFor="contact-interest"
                className="text-primary text-xs font-medium uppercase tracking-wider block"
              >
                Interest / What Interested You <span className="text-destructive">*</span>
              </label>
              <input
                id="contact-interest"
                type="text"
                required
                disabled={isSubmitting}
                placeholder="e.g. Full-Stack Project, AI Systems & MCP, Job Opportunity, Collaboration..."
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="border-edge bg-background/50 focus:border-ring focus:ring-ring/20 text-primary placeholder:text-muted-foreground/60 w-full rounded-md border px-3 py-2 text-sm transition-colors focus:ring-2 focus:outline-none disabled:opacity-50"
              />

              {/* Quick suggestion pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-muted-foreground text-[11px]">Quick fill:</span>
                {QUICK_INTERESTS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setInterest(item)}
                    className="border-edge hover:border-foreground/30 hover:bg-accent/60 text-muted-foreground hover:text-primary rounded-full border border-dashed px-2 py-0.5 text-[11px] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label
                htmlFor="contact-message"
                className="text-primary text-xs font-medium uppercase tracking-wider block"
              >
                Message <span className="text-destructive">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                disabled={isSubmitting}
                placeholder="Tell me about what you're working on, questions, or how we could work together..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border-edge bg-background/50 focus:border-ring focus:ring-ring/20 text-primary placeholder:text-muted-foreground/60 w-full resize-y rounded-md border px-3 py-2 text-sm transition-colors focus:ring-2 focus:outline-none disabled:opacity-50"
              />
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-2.5 text-xs text-destructive">
                <AlertCircle className="size-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <span className="text-muted-foreground font-mono text-[11px]">
                Deliveries routed to aayushdubey2300@gmail.com
              </span>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer gap-2 font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="size-3.5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
