"use client"

import { motion } from "framer-motion"
import { Palette, Code, Sparkles, Zap, Github, Twitter } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Visual Editor",
      description: "Drag and drop interface to create themes without writing a single line of code.",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Export to Any Framework",
      description: "Export your theme to CSS, Tailwind, CSS-in-JS, or any other framework you use.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI Color Suggestions",
      description: "Get intelligent color palette suggestions based on your brand colors.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Preview",
      description: "See your changes in real-time across different components and layouts.",
    },
    {
      icon: <Github className="h-6 w-6" />,
      title: "Version Control",
      description: "Save and track different versions of your themes as you iterate.",
    },
    {
      icon: <Twitter className="h-6 w-6" />,
      title: "Theme Sharing",
      description: "Share your themes with the community or keep them private for your projects.",
    },
  ]

  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need to create perfect themes</h2>
          <p className="text-lg text-muted-foreground">
            Built by an indie hacker for indie hackers. Theem gives you all the tools you need without the complexity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--gradient-from)]/10 to-[var(--gradient-to)]/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-card hover:bg-card/80 transition-colors duration-300 p-6 rounded-xl border shadow-sm h-full">
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4 text-primary">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

