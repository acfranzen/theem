import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';

import { Menu } from './menu';

interface SheetMenuProps {
  flags?: Record<string, boolean>;
}

export function SheetMenu({ flags }: SheetMenuProps) {
  return (
    <Sheet>
      <SheetTrigger className='lg:hidden' asChild>
        <Button className='h-8' variant='outline' size='icon'>
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className='sm:w-72 px-3 h-full flex flex-col' side='left'>
        <SheetHeader>
          <div className='flex justify-center items-center  w-48 h-16 ml-4'>
            <div className='w-full h-full bg-red-500'>Theem</div>
          </div>
        </SheetHeader>
        <Menu isOpen flags={flags} />
      </SheetContent>
    </Sheet>
  );
}
