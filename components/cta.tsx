"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTA() {
  return (
    <section className="relative isolate overflow-hidden bg-primary px-6 py-24 sm:py-32 lg:px-8">
      {/* Background pattern */}
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-primary-foreground/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="cta-pattern"
            width={200}
            height={200}
            x="50%"
            y={0}
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={0} className="overflow-visible fill-primary-foreground/5">
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect width="100%" height="100%" strokeWidth={0} fill="url(#cta-pattern)" />
      </svg>

      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/10"
        >
          <Sparkles className="h-8 w-8 text-primary-foreground" />
        </motion.div>

        <motion.h2
          className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Ready to dive into ocean data?
        </motion.h2>
        
        <motion.p
          className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Join researchers, scientists, and ocean enthusiasts who are already using FloatChat 
          to unlock insights from the world's oceans.
        </motion.p>
        
        <motion.div
          className="mt-10 flex items-center justify-center gap-x-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button 
            size="lg" 
            variant="secondary"
            className="group"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button 
            size="lg" 
            variant="ghost"
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            Schedule Demo
          </Button>
        </motion.div>

        <motion.p
          className="mt-8 text-sm text-primary-foreground/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          No credit card required • Free tier available • Setup in minutes
        </motion.p>
      </div>
    </section>
  )
}
