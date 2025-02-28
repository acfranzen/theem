'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { colorThemes } from './colorThemes';

export default function CTA({ colorScheme }: { colorScheme: keyof typeof colorThemes }) {
  return (
    <section className='py-20 sm:py-32'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={`bg-gradient-to-r ${colorThemes[colorScheme].gradient} rounded-2xl p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto`}
        >
          <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-white'>
            Ready to create beautiful themes?
          </h2>
          <p className='text-lg text-white/80 mb-8 max-w-2xl mx-auto'>
            Join thousands of indie hackers who are creating stunning themes with Theem. Start for
            free, no credit card required.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button size='lg' className='group bg-white text-primary hover:bg-white/90'>
              Get Started Free
              <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='bg-transparent border-white text-white hover:bg-white/10'
            >
              Schedule a Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
