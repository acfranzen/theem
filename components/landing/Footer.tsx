import Link from 'next/link';
import { Twitter, Github } from 'lucide-react';
import { colorThemes } from '@/components/landing/colorThemes';

export default function Footer({ colorScheme }: { colorScheme: keyof typeof colorThemes }) {
  return (
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
  );
}
