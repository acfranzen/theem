'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { colorThemes } from './colorThemes';
import Link from 'next/link';
import { DotPattern } from '@/components/magicui/dot-pattern';

export default function Hero({
  colorScheme,
  scrollY,
  handleColorChange,
}: {
  colorScheme: keyof typeof colorThemes;
  scrollY: number;
  handleColorChange: (color: keyof typeof colorThemes) => void;
}) {
  return (
    <section className='relative overflow-hidden py-20 sm:py-32'>
      <div className='absolute inset-0 -right-128'>
        <DotPattern
          className={`opacity-90 dark:opacity-80 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]`}
          width={20}
          height={20}
          cr={1.5}
          glow={true}
          style={{
            color: `hsl(${colorThemes[colorScheme].primary})`,
          }}
          initial={{ opacity: 1, scale: 1 }}
        />
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className='space-y-6'
          >
            <div
              className={`inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium`}
            >
              ✨ Finally, theme creation made simple
            </div>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold leading-tight'>
              Create beautiful themes{' '}
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r ${colorThemes[colorScheme].gradient}`}
              >
                without the hassle
              </span>
            </h1>
            <p className='text-lg text-muted-foreground max-w-lg'>
              Theem helps builders and developers create, customize, and export beautiful themes for
              their applications in minutes, not hours.
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button
                asChild
                size='lg'
                className={`group bg-gradient-to-r ${colorThemes[colorScheme].gradient} text-white border border-border`}
              >
                <Link href='/picker'>
                  Get Started Free
                  <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Link>
              </Button>
              <Button size='lg' variant='outline'>
                See Examples
              </Button>
            </div>
            <p className='text-sm text-muted-foreground'>
              No credit card required. Free plan available.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              y: scrollY * 0.1,
              rotate: scrollY * 0.02,
            }}
            className='relative'
          >
            <div className='relative mx-auto w-full max-w-md'>
              <div
                className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${colorThemes[colorScheme].gradient} p-1`}
              >
                <div className='h-full w-full rounded-lg bg-background p-4 shadow-xl'>
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex space-x-2'>
                      <div className='h-3 w-3 rounded-full bg-red-500'></div>
                      <div className='h-3 w-3 rounded-full bg-yellow-500'></div>
                      <div className='h-3 w-3 rounded-full bg-green-500'></div>
                    </div>
                    <div className='text-xs text-muted-foreground'>Theme Editor</div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <div className='h-4 w-24 rounded bg-primary/20'></div>
                      <div className='h-8 w-full rounded bg-primary/10'></div>
                      <div className='h-8 w-full rounded bg-primary/10'></div>
                      <div className='h-8 w-full rounded bg-primary/10'></div>
                    </div>
                    <div className='space-y-2'>
                      <div className='h-4 w-20 rounded bg-primary/20'></div>
                      <div className='grid grid-cols-3 gap-2'>
                        {Object.keys(colorThemes).map(color => (
                          <button
                            key={color}
                            className={`h-12 w-full rounded transition-transform duration-200 ease-in-out ${
                              colorScheme === color
                                ? 'ring-2 ring-offset-2 ring-primary scale-110'
                                : ''
                            }`}
                            style={{
                              backgroundColor: `hsl(${colorThemes[color as keyof typeof colorThemes].primary})`,
                            }}
                            onClick={() => handleColorChange(color as keyof typeof colorThemes)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className='mt-4 space-y-2'>
                    <div className='h-4 w-32 rounded bg-primary/20'></div>
                    <div className='flex space-x-2'>
                      <div className='h-8 w-16 rounded bg-primary'></div>
                      <div className='h-8 w-16 rounded bg-muted'></div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`absolute -bottom-6 -right-6 h-24 w-24 rounded-lg bg-gradient-to-br ${colorThemes[colorScheme].gradient} p-1 shadow-lg transform rotate-6`}
              >
                <div className='h-full w-full rounded bg-background p-2'>
                  <div className='h-4 w-12 rounded bg-primary/20 mb-2'></div>
                  <div className='grid grid-cols-2 gap-1'>
                    <div className='h-6 w-full rounded bg-purple-500/30'></div>
                    <div className='h-6 w-full rounded bg-pink-500/30'></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className='mt-20 flex flex-wrap justify-center gap-x-12 gap-y-6 grayscale opacity-70'
        >
          <div className='flex items-center'>
            <span className='text-xl font-semibold'>
              Inspired by the sadly discontinued v0 Themes
            </span>
          </div>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className='mt-20 flex flex-wrap justify-center gap-x-12 gap-y-6 grayscale opacity-70'
        >
          <div className='flex items-center'>
            <span className='text-xl font-semibold'>Used by builders at</span>
          </div>
          <div className='h-8 w-24 bg-foreground/80 rounded'></div>
          <div className='h-8 w-32 bg-foreground/80 rounded'></div>
          <div className='h-8 w-28 bg-foreground/80 rounded'></div>
          <div className='h-8 w-20 bg-foreground/80 rounded'></div>
        </motion.div> */}
      </div>
    </section>
  );
}
