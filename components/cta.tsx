"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="relative isolate overflow-hidden gradient-ocean-surface px-6 py-24 sm:py-32 lg:px-8">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-mesh opacity-40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/30 via-transparent to-transparent"></div>
      
      {/* Floating elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl animate-float-slow"></div>

      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20"
        >
          <Sparkles className="h-8 w-8 text-white" />
        </motion.div>

        <motion.h2
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Ready to dive into ocean data?
        </motion.h2>
        
        <motion.p
          className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Join researchers, scientists, and ocean enthusiasts who are already using FloatChat 
          to unlock insights from the world&apos;s oceans.
        </motion.p>
        
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button
            asChild
            size="lg"
            className="group bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
          >
            <Link href="/signup">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="ghost"
            className="text-white hover:bg-white/10 border border-white/20 px-8 py-4 text-lg"
          >
            Schedule Demo
          </Button>
        </motion.div>

        <motion.p
          className="mt-8 text-sm text-blue-200"
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
