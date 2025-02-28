"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Pricing() {
  const plans = [
    {
      name: "Hobby",
      price: "Free",
      description: "Perfect for side projects and experiments",
      features: ["3 themes", "Basic editor", "Export to CSS", "Community support"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$12",
      period: "/month",
      description: "Everything you need for serious projects",
      features: [
        "Unlimited themes",
        "Advanced editor",
        "Export to any format",
        "Version history",
        "Priority support",
        "AI color suggestions",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Team",
      price: "$49",
      period: "/month",
      description: "Collaborate with your entire team",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Role-based permissions",
        "Theme library",
        "API access",
        "Dedicated support",
      ],
      cta: "Contact Us",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-muted-foreground">Start for free, upgrade when you need more. No hidden fees.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${plan.popular ? "lg:-mt-4 lg:mb-4" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={`bg-card rounded-xl p-6 border shadow-sm h-full ${plan.popular ? "border-primary/50 ring-1 ring-primary/20" : ""}`}
              >
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button size="lg" className="w-full" variant={plan.popular ? "default" : "outline"}>
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

