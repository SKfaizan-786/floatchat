"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  MessageSquare, 
  Server, 
  BarChart3, 
  Download,
  ArrowRight
} from "lucide-react"
import { Card } from "@/components/ui/card"

const steps = [
  {
    number: "01",
    title: "Ask Your Question",
    description: "Type your query in natural language. Ask about temperature profiles, salinity trends, or any oceanographic parameter.",
    icon: MessageSquare,
    example: '"Show me temperature anomalies in the Arabian Sea for the last 3 months"',
  },
  {
    number: "02",
    title: "AI Processing",
    description: "Our AI understands your intent and translates it into optimized database queries using RAG (Retrieval-Augmented Generation).",
    icon: Server,
    example: "Converting to SQL queries and searching vector databases for relevant ARGO float data",
  },
  {
    number: "03",
    title: "Data Visualization",
    description: "Get instant interactive visualizations. Explore depth profiles, time series, and geospatial maps of your data.",
    icon: BarChart3,
    example: "Interactive charts showing temperature variations by depth and location",
  },
  {
    number: "04",
    title: "Export & Analyze",
    description: "Download your findings in various formats for further analysis or publication. Share insights with your team.",
    icon: Download,
    example: "Export to NetCDF, CSV, or generate publication-ready figures",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-secondary/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            className="text-base font-semibold leading-7 text-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            From question to insight in seconds
          </motion.p>
          <motion.p
            className="mt-6 text-lg leading-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            FloatChat simplifies complex data exploration into four simple steps
          </motion.p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="relative overflow-hidden p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <step.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-5xl font-bold text-primary/20">{step.number}</span>
                        <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                      </div>
                      <p className="mt-2 text-muted-foreground">{step.description}</p>
                      <div className="mt-4 rounded-lg bg-muted/50 p-3">
                        <p className="text-sm text-muted-foreground italic">Example: {step.example}</p>
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute -bottom-2 right-4 hidden lg:block">
                      <ArrowRight className="h-8 w-8 text-primary/20" />
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Demo Teaser */}
        <motion.div
          className="mt-16 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-foreground">Ready to explore the ocean?</h3>
          <p className="mt-2 text-muted-foreground">
            Try our interactive demo and see FloatChat in action
          </p>
          <button className="mt-6 rounded-lg bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90 transition-colors">
            Launch Demo
          </button>
        </motion.div>
      </div>
    </section>
  )
}
