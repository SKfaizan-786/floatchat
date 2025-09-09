"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Waves,
  Users,
  Lightbulb,
  Target
} from "lucide-react"

const stats = [
  { label: "ARGO Floats", value: "4,000+", description: "Active floats worldwide" },
  { label: "Data Points", value: "2M+", description: "Oceanographic measurements" },
  { label: "Ocean Coverage", value: "Global", description: "All major ocean basins" },
  { label: "Update Frequency", value: "Real-time", description: "Live data streaming" },
]

const values = [
  {
    icon: Users,
    title: "Democratizing Ocean Data",
    description: "Making complex oceanographic data accessible to researchers, policymakers, and ocean enthusiasts alike."
  },
  {
    icon: Lightbulb,
    title: "Innovation Through AI",
    description: "Leveraging cutting-edge AI and LLMs to transform how we interact with and understand ocean data."
  },
  {
    icon: Target,
    title: "Scientific Accuracy",
    description: "Maintaining the highest standards of data integrity while simplifying access and visualization."
  }
]

export function About() {
  return (
    <section id="about" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            className="text-base font-semibold leading-7 text-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            About FloatChat
          </motion.h2>
          <motion.p
            className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Bridging the gap between data and discovery
          </motion.p>
        </div>

        {/* Mission Statement */}
        <motion.div
          className="mx-auto mt-16 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 text-center">
            <Waves className="mx-auto h-12 w-12 text-primary mb-4" />
            <p className="text-lg leading-8 text-muted-foreground">
              FloatChat is revolutionizing ocean data exploration by combining the power of AI with the wealth of 
              information from the global ARGO float network. Our mission is to make oceanographic data accessible 
              to everyone - from seasoned researchers to curious students - enabling better understanding of our 
              oceans and informed decision-making for marine conservation and climate research.
            </p>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mx-auto mt-16 max-w-2xl lg:max-w-none"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <dt className="text-base leading-7 text-muted-foreground">{stat.label}</dt>
                <dd className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{stat.value}</dd>
                <dd className="text-sm text-muted-foreground">{stat.description}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>

        {/* Values */}
        <div className="mx-auto mt-24 max-w-2xl lg:max-w-none">
          <h3 className="text-center text-2xl font-bold text-foreground mb-12">Our Core Values</h3>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full">
                  <value.icon className="h-10 w-10 text-primary mb-4" />
                  <h4 className="text-lg font-semibold text-foreground mb-2">{value.title}</h4>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <motion.div
          className="mx-auto mt-24 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-center text-2xl font-bold text-foreground mb-8">Powered by Advanced Technology</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="secondary" className="px-4 py-2">LLMs (GPT, LLaMA, Mistral)</Badge>
            <Badge variant="secondary" className="px-4 py-2">Vector Databases</Badge>
            <Badge variant="secondary" className="px-4 py-2">RAG Pipeline</Badge>
            <Badge variant="secondary" className="px-4 py-2">NetCDF Processing</Badge>
            <Badge variant="secondary" className="px-4 py-2">PostgreSQL</Badge>
            <Badge variant="secondary" className="px-4 py-2">Real-time Streaming</Badge>
            <Badge variant="secondary" className="px-4 py-2">Interactive Dashboards</Badge>
            <Badge variant="secondary" className="px-4 py-2">Cloud Infrastructure</Badge>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
