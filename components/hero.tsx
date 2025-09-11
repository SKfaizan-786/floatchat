"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MessageSquare, Database, BarChart3 } from "lucide-react"
import  Globe  from "@/components/globe"
import { OceanParticles, WaveAnimation } from "@/components/floating-elements"

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-ocean-deep px-6 py-24 sm:py-32 lg:px-8 min-h-screen flex items-center">
      {/* Background mesh gradient */}
      <div className="absolute inset-0 gradient-mesh opacity-30"></div>
      
      {/* Ocean particles */}
      <OceanParticles />
      
      {/* 3D Globe */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] hidden lg:block -mr-20">
        <Globe className="opacity-90" />
      </div>
      
      {/* Floating ocean elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Simplified floating elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-blue-500/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-1/4 w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"
          style={{
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)'
          }}
        />
      </div>
      
      {/* Wave animation at bottom */}
      <WaveAnimation />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge variant="secondary" className="mb-6 bg-blue-500/20 text-blue-200 border-blue-400/30 px-4 py-2">
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mr-2"
              >
                ✨
              </motion.span>
              Powered by AI & Oceanographic Data
            </Badge>
          </motion.div>
          
          <motion.h1
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            The Ocean Data{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Copilot
            </span>{" "}
            for Marine Research
          </motion.h1>
          
          <motion.p
            className="mt-6 text-xl leading-8 text-blue-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Transform complex oceanographic data into actionable insights. FloatChat combines 
            AI-powered conversations with real-time ARGO float data to revolutionize marine research 
            and ocean exploration.
          </motion.p>
          
          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button size="lg" className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg shadow-xl shadow-blue-500/25">
                Start Exploring
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button size="lg" variant="outline" className="border-blue-400/50 text-blue-200 hover:bg-blue-500/10 px-8 py-4 text-lg backdrop-blur">
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="mt-12 flex items-center justify-center gap-8 text-sm text-blue-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span>✓ No credit card required</span>
            <span>✓ Free tier available</span>
            <span>✓ Setup in minutes</span>
          </motion.div>
        </div>

        {/* Feature preview cards */}
        <motion.div
          className="mt-20 flow-root"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative glass-card rounded-2xl p-8 lg:p-12 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-400/5 rounded-full blur-xl animate-pulse delay-1000"></div>
            
            <div className="mx-auto max-w-4xl relative">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {[
                  {
                    icon: MessageSquare,
                    title: "Natural Language Queries",
                    description: '"Show me temperature anomalies in the Arabian Sea for March 2023"',
                    color: "blue",
                    delay: 0
                  },
                  {
                    icon: Database,
                    title: "Live Ocean Data",
                    description: "Real-time access to 4,000+ active ARGO floats worldwide",
                    color: "cyan",
                    delay: 0.1
                  },
                  {
                    icon: BarChart3,
                    title: "Smart Visualizations",
                    description: "Interactive maps, depth profiles, and trend analysis",
                    color: "teal",
                    delay: 0.2
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="flex items-start gap-x-4 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + feature.delay }}
                  >
                    <div
                      className={`rounded-xl p-3 ring-1 transition-colors ${
                        feature.color === 'blue' ? 'bg-blue-500/20 ring-blue-400/30' :
                        feature.color === 'cyan' ? 'bg-cyan-500/20 ring-cyan-400/30' :
                        'bg-teal-500/20 ring-teal-400/30'
                      }`}
                    >
                      <feature.icon className={`h-6 w-6 ${
                        feature.color === 'blue' ? 'text-blue-400' :
                        feature.color === 'cyan' ? 'text-cyan-400' :
                        'text-teal-400'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-blue-200 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}