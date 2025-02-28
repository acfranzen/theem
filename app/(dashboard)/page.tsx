'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import Pricing from '@/components/landing/Pricing';
import Testimonials from '@/components/landing/Testimonials';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';
import { colorThemes } from '@/components/landing/colorThemes';

export default function LandingPage() {
  // Use theme from next-themes provider instead of local state
  const { theme, setTheme } = useTheme();
  const [colorScheme, setColorScheme] = useState<keyof typeof colorThemes>('purple');
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update CSS variables when color scheme changes
  useEffect(() => {
    const root = document.documentElement;
    const themeColors = colorThemes[colorScheme];

    Object.entries(themeColors).forEach(([key, value]) => {
      if (key === 'gradient') {
        const [from, to] = (value as string).split(' ');
        root.style.setProperty('--gradient-from', from.replace('from-', ''));
        root.style.setProperty('--gradient-to', to.replace('to-', ''));
      } else {
        root.style.setProperty(`--${key}`, value as string);
      }
    });
  }, [colorScheme]);

  // Theme toggle function
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Color scheme change handler
  const handleColorChange = (color: keyof typeof colorThemes) => {
    setColorScheme(color);
  };

  return (
    <div className='min-h-screen bg-background text-foreground transition-colors duration-300'>
      <Navbar theme={theme || 'light'} toggleTheme={toggleTheme} />
      <Hero colorScheme={colorScheme} scrollY={scrollY} handleColorChange={handleColorChange} />
      <Features colorScheme={colorScheme} />
      <HowItWorks colorScheme={colorScheme} />
      <Pricing colorScheme={colorScheme} />
      <Testimonials colorScheme={colorScheme} />
      <CTA colorScheme={colorScheme} />
      <Footer colorScheme={colorScheme} />
    </div>
  );
}
