"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MessageSquare, Database, BarChart3 } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 px-6 py-24 sm:py-32 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-primary/10 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="ocean-pattern"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-primary/5">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#ocean-pattern)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-4">
              Powered by AI & Oceanographic Data
            </Badge>
          </motion.div>
          
          <motion.h1
            className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore Ocean Data with{" "}
            <span className="text-primary">Natural Language</span>
          </motion.h1>
          
          <motion.p
            className="mt-6 text-lg leading-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            FloatChat democratizes access to ARGO float data through AI-powered conversations. 
            Ask questions, visualize patterns, and unlock insights from the world's oceans - 
            no technical expertise required.
          </motion.p>
          
          <motion.div
            className="mt-10 flex items-center justify-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </motion.div>
        </div>

        {/* Feature preview cards */}
        <motion.div
          className="mt-16 flow-root sm:mt-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative rounded-xl bg-card/50 backdrop-blur ring-1 ring-border/50 lg:rounded-2xl">
            <div className="relative px-6 pb-8 pt-8 sm:px-10 sm:pt-10">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:gap-x-8">
                  <div className="flex items-start gap-x-4">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Natural Language Queries</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Ask questions like "Show me salinity profiles near the equator"
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-x-4">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Database className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Real-time ARGO Data</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Access live oceanographic measurements from thousands of floats
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-x-4">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Interactive Visualizations</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Explore data through maps, charts, and depth-time plots
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
