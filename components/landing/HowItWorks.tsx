"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Choose your base",
      description: "Start with a pre-built theme or create one from scratch with our visual editor.",
    },
    {
      step: "02",
      title: "Customize everything",
      description: "Adjust colors, typography, spacing, and more with real-time preview.",
    },
    {
      step: "03",
      title: "Export & implement",
      description: "Export your theme in your preferred format and implement it in your project.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 sm:py-32 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How Theem works</h2>
          <p className="text-lg text-muted-foreground">
            Creating the perfect theme for your project has never been easier
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--gradient-from)]/0 via-[var(--gradient-from)]/50 to-[var(--gradient-to)]/0 hidden lg:block"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative z-10"
            >
              <div className="bg-background rounded-xl p-6 border shadow-sm h-full">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] flex items-center justify-center text-white font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Button size="lg" className="group">
            Try It Now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

