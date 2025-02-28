'use client';

import { motion } from 'framer-motion';
import { colorThemes } from './colorThemes';

export default function Testimonials({ colorScheme }: { colorScheme: keyof typeof colorThemes }) {
  const testimonials = [
    {
      quote:
        'Theem saved me hours of work. I was able to create a beautiful theme for my SaaS in minutes.',
      author: 'Sarah K.',
      role: 'Indie Hacker',
    },
    {
      quote: "The AI color suggestions are mind-blowing. It's like having a designer on your team.",
      author: 'Mike T.',
      role: 'Frontend Developer',
    },
    {
      quote: "I've tried many theme creators, but Theem is by far the most intuitive and powerful.",
      author: 'Alex R.',
      role: 'Product Designer',
    },
    {
      quote:
        'Being able to export to any framework is a game-changer. Works perfectly with my Next.js projects.',
      author: 'Jamie L.',
      role: 'Full-stack Developer',
    },
    {
      quote:
        'The version control feature is brilliant. I can experiment without fear of losing my work.',
      author: 'Chris D.',
      role: 'UI Engineer',
    },
    {
      quote:
        'As a non-designer, Theem has been invaluable for creating professional-looking themes.',
      author: 'Pat M.',
      role: 'Solo Founder',
    },
  ];

  return (
    <section className='py-20 sm:py-32 bg-muted/50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className='text-center max-w-3xl mx-auto mb-16'
        >
          <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
            Loved by{' '}
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r ${colorThemes[colorScheme].gradient}`}
            >
              builders
            </span>
          </h2>
          <p className='text-lg text-muted-foreground'>
            Don't just take our word for it. Here's what our users have to say.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className={`bg-background rounded-xl p-6 border border-[hsl(${colorThemes[colorScheme].primary})]/10 hover:border-[hsl(${colorThemes[colorScheme].primary})]/30 transition-colors duration-300 shadow-sm h-full`}
              >
                <div className={`mb-4 text-[hsl(${colorThemes[colorScheme].primary})]`}>
                  {'★'.repeat(5)}
                </div>
                <p className='mb-4 italic'>"{testimonial.quote}"</p>
                <div>
                  <p className='font-semibold'>{testimonial.author}</p>
                  <p className='text-sm text-muted-foreground'>{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
