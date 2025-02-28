'use client';

import { motion } from 'framer-motion';
import { Palette, Code, Sparkles, Zap, Github, Twitter } from 'lucide-react';
import { colorThemes } from './colorThemes';

export default function Features({ colorScheme }: { colorScheme: keyof typeof colorThemes }) {
  const features = [
    {
      icon: <Palette className='h-6 w-6' />,
      title: 'Visual Editor',
      description:
        'Drag and drop interface to create themes without writing a single line of code.',
    },
    {
      icon: <Code className='h-6 w-6' />,
      title: 'Export to Any Framework',
      description: 'Export your theme to CSS, Tailwind, CSS-in-JS, or any other framework you use.',
    },
    {
      icon: <Sparkles className='h-6 w-6' />,
      title: 'AI Color Suggestions',
      description: 'Get intelligent color palette suggestions based on your brand colors.',
    },
    {
      icon: <Zap className='h-6 w-6' />,
      title: 'Instant Preview',
      description: 'See your changes in real-time across different components and layouts.',
    },
    {
      icon: <Github className='h-6 w-6' />,
      title: 'Version Control',
      description: 'Save and track different versions of your themes as you iterate.',
    },
    {
      icon: <Twitter className='h-6 w-6' />,
      title: 'Theme Sharing',
      description: 'Share your themes with the community or keep them private for your projects.',
    },
  ];

  return (
    <section id='features' className='py-20 sm:py-32'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className='text-center max-w-3xl mx-auto mb-16'
        >
          <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
            Everything you need to create{' '}
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r ${colorThemes[colorScheme].gradient}`}
            >
              perfect themes
            </span>
          </h2>
          <p className='text-lg text-muted-foreground'>
            Built by an indie hacker for builders. Theem gives you all the tools you need without
            the complexity.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='relative group'
            >
              <div
                className='relative bg-card hover:bg-card/90 transition-colors duration-300 p-6 rounded-xl border shadow-sm h-full'
                style={{
                  borderColor: `hsla(${colorThemes[colorScheme].primary}, 0.2)`,
                  borderWidth: '1px',
                }}
              >
                <div
                  className='p-3 rounded-lg w-fit mb-4'
                  style={{
                    backgroundColor: `hsla(${colorThemes[colorScheme].primary}, 0.1)`,
                    color: `hsl(${colorThemes[colorScheme].primary})`,
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
                <p className='text-muted-foreground'>{feature.description}</p>

                {/* Overlay border for hover effect */}
                <div
                  className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300'
                  style={{
                    boxShadow: `inset 0 0 0 1px hsla(${colorThemes[colorScheme].primary}, 0.4)`,
                  }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
