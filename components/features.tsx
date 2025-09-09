"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  MessageSquare, 
  Map, 
  LineChart, 
  Database, 
  Globe, 
  Zap,
  Search,
  FileText,
  Cloud
} from "lucide-react"

const features = [
  {
    name: "Conversational Interface",
    description: "Interact with ocean data using natural language. Ask questions like 'What are the temperature trends in the Pacific?' and get instant insights.",
    icon: MessageSquare,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    name: "Interactive Maps",
    description: "Visualize ARGO float trajectories and data points on interactive global maps. Track float movements and explore regional patterns.",
    icon: Map,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    name: "Advanced Visualizations",
    description: "Generate depth-time plots, profile comparisons, and trend analyses. Export publication-ready charts and graphs.",
    icon: LineChart,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    name: "Comprehensive Database",
    description: "Access millions of oceanographic measurements from the global ARGO network, updated in real-time.",
    icon: Database,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    name: "Global Coverage",
    description: "Explore data from all major ocean basins, with special focus on the Indian Ocean and surrounding regions.",
    icon: Globe,
    color: "text-cyan-600",
    bgColor: "bg-cyan-100",
  },
  {
    name: "Lightning Fast",
    description: "Powered by vector databases and optimized queries for instant responses to your questions.",
    icon: Zap,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    name: "Smart Search",
    description: "AI-powered search understands context and intent, helping you find exactly what you're looking for.",
    icon: Search,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    name: "Export Options",
    description: "Download data in multiple formats including NetCDF, CSV, and ASCII for further analysis.",
    icon: FileText,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    name: "Cloud-Based",
    description: "Access FloatChat from anywhere, with all processing handled in the cloud for maximum performance.",
    icon: Cloud,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
  },
]

export function Features() {
  return (
    <section id="features" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            className="text-base font-semibold leading-7 text-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Everything you need
          </motion.h2>
          <motion.p
            className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Powerful features for ocean data exploration
          </motion.p>
          <motion.p
            className="mt-6 text-lg leading-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            FloatChat combines cutting-edge AI with comprehensive oceanographic databases 
            to provide an intuitive platform for data discovery and analysis.
          </motion.p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className={`mb-6 flex h-10 w-10 items-center justify-center rounded-lg ${feature.bgColor}`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
