'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Sparkles, Code, Zap, ArrowRight, Check, Github, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Define the type for color themes
const colorThemes: Record<
  string,
  { primary: string; secondary: string; accent: string; gradient: string }
> = {
  purple: {
    primary: '267 75% 60%',
    secondary: '240 4.8% 95.9%',
    accent: '240 4.8% 95.9%',
    gradient: 'from-purple-500 to-pink-500',
  },
  blue: {
    primary: '221 83% 53%',
    secondary: '210 40% 96.1%',
    accent: '210 40% 96.1%',
    gradient: 'from-blue-500 to-cyan-500',
  },
  green: {
    primary: '142 76% 36%',
    secondary: '138 76% 97%',
    accent: '138 76% 97%',
    gradient: 'from-green-500 to-emerald-500',
  },
  orange: {
    primary: '24 100% 50%',
    secondary: '27 100% 95%',
    accent: '27 100% 95%',
    gradient: 'from-orange-500 to-yellow-500',
  },
  pink: {
    primary: '330 81% 60%',
    secondary: '329 100% 94%',
    accent: '329 100% 94%',
    gradient: 'from-pink-500 to-rose-500',
  },
  gray: {
    primary: '220 14% 40%',
    secondary: '220 13% 91%',
    accent: '220 13% 91%',
    gradient: 'from-gray-500 to-slate-500',
  },
};

export default function LandingPage() {
  const [theme, setTheme] = useState('light');
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
    Object.entries(colorThemes[colorScheme]).forEach(([key, value]) => {
      if (key === 'gradient') {
        const [from, to] = value.split(' ');
        root.style.setProperty('--gradient-from', from.replace('from-', ''));
        root.style.setProperty('--gradient-to', to.replace('to-', ''));
      } else {
        root.style.setProperty(`--${key}`, value);
      }
    });
  }, [colorScheme]);

  // Theme toggle demo
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Color scheme change handler
  const handleColorChange = (color: keyof typeof colorThemes) => {
    setColorScheme(color);
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className='min-h-screen bg-background text-foreground transition-colors duration-300'>
        {/* Navbar */}
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
                  className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colorThemes[colorScheme].gradient}`}
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
                <Link href='#features' className='text-sm hover:text-primary transition-colors'>
                  Features
                </Link>
                <Link href='#how-it-works' className='text-sm hover:text-primary transition-colors'>
                  How it works
                </Link>
                <Link href='#pricing' className='text-sm hover:text-primary transition-colors'>
                  Pricing
                </Link>
                <Button size='sm' variant='outline' onClick={toggleTheme}>
                  {theme === 'light' ? '🌙' : '☀️'}
                </Button>
                <Button size='sm'>Get Started</Button>
              </motion.div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className='relative overflow-hidden py-20 sm:py-32'>
          <div
            className={`absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05] bg-gradient-to-br ${colorThemes[colorScheme].gradient}`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

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
                  Theem helps indie hackers and developers create, customize, and export beautiful
                  themes for their applications in minutes, not hours.
                </p>
                <div className='flex flex-col sm:flex-row gap-4'>
                  <Button size='lg' className='group'>
                    Get Started Free
                    <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
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
                                style={{ backgroundColor: `hsl(${colorThemes[color].primary})` }}
                                onClick={() => handleColorChange(color)}
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
                <span className='text-xl font-semibold'>Used by indie hackers at</span>
              </div>
              <div className='h-8 w-24 bg-foreground/80 rounded'></div>
              <div className='h-8 w-32 bg-foreground/80 rounded'></div>
              <div className='h-8 w-28 bg-foreground/80 rounded'></div>
              <div className='h-8 w-20 bg-foreground/80 rounded'></div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
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
                Everything you need to create perfect themes
              </h2>
              <p className='text-lg text-muted-foreground'>
                Built by an indie hacker for indie hackers. Theem gives you all the tools you need
                without the complexity.
              </p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {[
                {
                  icon: <Palette className='h-6 w-6' />,
                  title: 'Visual Editor',
                  description:
                    'Drag and drop interface to create themes without writing a single line of code.',
                },
                {
                  icon: <Code className='h-6 w-6' />,
                  title: 'Export to Any Framework',
                  description:
                    'Export your theme to CSS, Tailwind, CSS-in-JS, or any other framework you use.',
                },
                {
                  icon: <Sparkles className='h-6 w-6' />,
                  title: 'AI Color Suggestions',
                  description:
                    'Get intelligent color palette suggestions based on your brand colors.',
                },
                {
                  icon: <Zap className='h-6 w-6' />,
                  title: 'Instant Preview',
                  description:
                    'See your changes in real-time across different components and layouts.',
                },
                {
                  icon: <Github className='h-6 w-6' />,
                  title: 'Version Control',
                  description: 'Save and track different versions of your themes as you iterate.',
                },
                {
                  icon: <Twitter className='h-6 w-6' />,
                  title: 'Theme Sharing',
                  description:
                    'Share your themes with the community or keep them private for your projects.',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className='relative group'
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-[var(--gradient-from)]/10 to-[var(--gradient-to)]/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  <div className='relative bg-card hover:bg-card/80 transition-colors duration-300 p-6 rounded-xl border shadow-sm h-full'>
                    <div className='p-3 bg-primary/10 rounded-lg w-fit mb-4 text-primary'>
                      {feature.icon}
                    </div>
                    <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
                    <p className='text-muted-foreground'>{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id='how-it-works' className='py-20 sm:py-32 bg-muted/50'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className='text-center max-w-3xl mx-auto mb-16'
            >
              <h2 className='text-3xl sm:text-4xl font-bold mb-4'>How Theem works</h2>
              <p className='text-lg text-muted-foreground'>
                Creating the perfect theme for your project has never been easier
              </p>
            </motion.div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 relative'>
              <div className='absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--gradient-from)]/0 via-[var(--gradient-from)]/50 to-[var(--gradient-to)]/0 hidden lg:block'></div>

              {[
                {
                  step: '01',
                  title: 'Choose your base',
                  description:
                    'Start with a pre-built theme or create one from scratch with our visual editor.',
                },
                {
                  step: '02',
                  title: 'Customize everything',
                  description:
                    'Adjust colors, typography, spacing, and more with real-time preview.',
                },
                {
                  step: '03',
                  title: 'Export & implement',
                  description:
                    'Export your theme in your preferred format and implement it in your project.',
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className='relative z-10'
                >
                  <div className='bg-background rounded-xl p-6 border shadow-sm h-full'>
                    <div className='w-12 h-12 rounded-full bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] flex items-center justify-center text-white font-bold mb-4'>
                      {step.step}
                    </div>
                    <h3 className='text-xl font-semibold mb-2'>{step.title}</h3>
                    <p className='text-muted-foreground'>{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className='mt-16 text-center'
            >
              <Button size='lg' className='group'>
                Try It Now
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id='pricing' className='py-20 sm:py-32'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className='text-center max-w-3xl mx-auto mb-16'
            >
              <h2 className='text-3xl sm:text-4xl font-bold mb-4'>Simple, transparent pricing</h2>
              <p className='text-lg text-muted-foreground'>
                Start for free, upgrade when you need more. No hidden fees.
              </p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {[
                {
                  name: 'Hobby',
                  price: 'Free',
                  description: 'Perfect for side projects and experiments',
                  features: ['3 themes', 'Basic editor', 'Export to CSS', 'Community support'],
                  cta: 'Get Started',
                  popular: false,
                },
                {
                  name: 'Pro',
                  price: '$12',
                  period: '/month',
                  description: 'Everything you need for serious projects',
                  features: [
                    'Unlimited themes',
                    'Advanced editor',
                    'Export to any format',
                    'Version history',
                    'Priority support',
                    'AI color suggestions',
                  ],
                  cta: 'Get Started',
                  popular: true,
                },
                {
                  name: 'Team',
                  price: '$49',
                  period: '/month',
                  description: 'Collaborate with your entire team',
                  features: [
                    'Everything in Pro',
                    'Team collaboration',
                    'Role-based permissions',
                    'Theme library',
                    'API access',
                    'Dedicated support',
                  ],
                  cta: 'Contact Us',
                  popular: false,
                },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative ${plan.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
                >
                  {plan.popular && (
                    <div className='absolute -top-4 left-0 right-0 flex justify-center'>
                      <div className='bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full'>
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div
                    className={`bg-card rounded-xl p-6 border shadow-sm h-full ${plan.popular ? 'border-primary/50 ring-1 ring-primary/20' : ''}`}
                  >
                    <h3 className='text-xl font-semibold mb-2'>{plan.name}</h3>
                    <div className='mb-4'>
                      <span className='text-3xl font-bold'>{plan.price}</span>
                      {plan.period && <span className='text-muted-foreground'>{plan.period}</span>}
                    </div>
                    <p className='text-muted-foreground mb-6'>{plan.description}</p>

                    <ul className='space-y-3 mb-8'>
                      {plan.features.map((feature, i) => (
                        <li key={i} className='flex items-center'>
                          <Check className='h-5 w-5 text-primary mr-2 flex-shrink-0' />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      size='lg'
                      className='w-full'
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className='py-20 sm:py-32 bg-muted/50'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className='text-center max-w-3xl mx-auto mb-16'
            >
              <h2 className='text-3xl sm:text-4xl font-bold mb-4'>Loved by indie hackers</h2>
              <p className='text-lg text-muted-foreground'>
                Don't just take our word for it. Here's what our users have to say.
              </p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {[
                {
                  quote:
                    'Theem saved me hours of work. I was able to create a beautiful theme for my SaaS in minutes.',
                  author: 'Sarah K.',
                  role: 'Indie Hacker',
                },
                {
                  quote:
                    "The AI color suggestions are mind-blowing. It's like having a designer on your team.",
                  author: 'Mike T.',
                  role: 'Frontend Developer',
                },
                {
                  quote:
                    "I've tried many theme creators, but Theem is by far the most intuitive and powerful.",
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
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className='bg-background rounded-xl p-6 border shadow-sm h-full'>
                    <div className='mb-4 text-primary'>{'★'.repeat(5)}</div>
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

        {/* CTA Section */}
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
                Join thousands of indie hackers who are creating stunning themes with Theem. Start
                for free, no credit card required.
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

        {/* Footer */}
        <footer className='py-12 border-t'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8'>
              <div className='col-span-2 lg:col-span-2'>
                <div
                  className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colorThemes[colorScheme].gradient} mb-4`}
                >
                  Theem
                </div>
                <p className='text-muted-foreground mb-4 max-w-xs'>
                  Create beautiful themes for your applications without the hassle.
                </p>
                <div className='flex space-x-4'>
                  <Link
                    href='#'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    <Twitter className='h-5 w-5' />
                    <span className='sr-only'>Twitter</span>
                  </Link>
                  <Link
                    href='#'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    <Github className='h-5 w-5' />
                    <span className='sr-only'>GitHub</span>
                  </Link>
                </div>
              </div>

              <div>
                <h3 className='font-semibold mb-4'>Product</h3>
                <ul className='space-y-2'>
                  <li>
                    <Link
                      href='#'
                      className='text-muted-foreground hover:text-foreground transition-colors'
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='text-muted-foreground hover:text-foreground transition-colors'
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='text-muted-foreground hover:text-foreground transition-colors'
                    >
                      Roadmap
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='text-muted-foreground hover:text-foreground transition-colors'
                    >
                      Changelog
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='font-semibold mb-4'>Resources</h3>
                <ul className='space-y-2'>
                  <li>
                    <Link
                      href='#'
                      className='text-muted-foreground hover:text-foreground transition-colors'
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='text-muted-foreground hover:text-foreground transition-colors'
                    >
                      Tutorials
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='text-muted-foreground hover:text-foreground transition-colors'
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='text-muted-foreground hover:text-foreground transition-colors'
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='font-semibold mb-4'>Company</h3>
                <ul className='space-y-2'>
                  <li>
                    <Link
                      href='#'
                      className='text-muted-foreground hover:text-foreground transition-colors'
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='text-muted-foreground hover:text-foreground transition-colors'
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='text-muted-foreground hover:text-foreground transition-colors'
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='text-muted-foreground hover:text-foreground transition-colors'
                    >
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className='mt-12 pt-8 border-t text-center text-sm text-muted-foreground'>
              <p>
                © {new Date().getFullYear()} Theem. All rights reserved. Built with ❤️ by an indie
                hacker.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
