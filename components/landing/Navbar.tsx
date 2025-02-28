'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { colorThemes } from './colorThemes';

export default function Navbar({
  theme,
  toggleTheme,
}: {
  theme: string | undefined;
  toggleTheme: () => void;
}) {
  return (
    <nav className='sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='flex items-center'
          >
            <span
              className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colorThemes.purple.gradient}`}
            >
              Theem
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='flex items-center space-x-4'
          >
            {/* <Link href='#features' className='text-sm hover:text-primary transition-colors'>
              Features
            </Link>
            <Link href='#how-it-works' className='text-sm hover:text-primary transition-colors'>
              How it works
            </Link>
            <Link href='#pricing' className='text-sm hover:text-primary transition-colors'>
              Pricing
            </Link> */}
            <Button size='sm' variant='outline' onClick={toggleTheme}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </Button>
            {/* <Button size='sm'>Get Started</Button> */}
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
