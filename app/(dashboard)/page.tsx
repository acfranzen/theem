'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import Pricing from '@/components/landing/Pricing';
import Testimonials from '@/components/landing/Testimonials';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';
import FloatingColorPicker from '@/components/landing/FloatingColorPicker';
import { colorThemes } from '@/components/landing/colorThemes';

export default function LandingPage() {
  // Use theme from next-themes provider instead of local state
  const { theme, setTheme } = useTheme();
  const [colorScheme, setColorScheme] = useState<keyof typeof colorThemes>('purple');
  const [scrollY, setScrollY] = useState(0);
  const [showFloatingPicker, setShowFloatingPicker] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Handle scroll for parallax effects and floating picker visibility
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Show floating picker when hero section is not fully visible
      if (heroRef.current) {
        const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
        setShowFloatingPicker(window.scrollY > heroBottom - 200); // Show a bit before fully scrolled past
      }
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
      <div ref={heroRef}>
        <Hero colorScheme={colorScheme} scrollY={scrollY} handleColorChange={handleColorChange} />
      </div>
      {/* <Features colorScheme={colorScheme} />
      <HowItWorks colorScheme={colorScheme} />
      <Pricing colorScheme={colorScheme} />
      <Testimonials colorScheme={colorScheme} />
      <CTA colorScheme={colorScheme} />
      <Footer colorScheme={colorScheme} />

      <FloatingColorPicker
        colorScheme={colorScheme}
        handleColorChange={handleColorChange}
        isVisible={showFloatingPicker}
      /> */}
    </div>
  );
}
