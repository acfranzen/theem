import { SidebarTrigger } from '@/components/ui/sidebar';
import { SheetMenu } from './sheet-menu';
import { UserNav } from './user-nav';

interface NavbarProps {
  title: string;
  flags?: Record<string, boolean>;
}

export function Navbar({ title, flags }: NavbarProps) {
  return (
    <header className='sticky top-0 z-[15] w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/5 dark:shadow-secondary'>
      <div className='mx-4 sm:mx-8 flex h-14 items-center'>
        <SidebarTrigger />
        <div className='flex items-center space-x-4 lg:space-x-0'>
          <h1 className='font-bold text-foreground'>{title}</h1>
        </div>
        <div className='flex flex-1 items-center space-x-2 justify-end'>
          <UserNav />
        </div>
      </div>
    </header>
  );
}
