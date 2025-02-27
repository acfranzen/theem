import { cn } from '@/lib/utils';
import TailwindLogo from 'src/components/logo/TailwindLogo';
import { useSidebarToggle } from 'src/hooks/use-sidebar-toggle';
import { useStore } from 'src/hooks/use-store';

import { Menu } from './menu';
import { SidebarToggle } from './sidebar-toggle';

export function Sidebar({ flags }: { flags?: Record<string, boolean> }) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 bg-card border-r',
        sidebar?.isOpen === false ? 'w-[90px]' : 'w-72'
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-0 overflow-y-auto shadow-md dark:shadow-slate-600">
        <div
          className={` ${!sidebar?.isOpen ? 'h-12 w-14 pl-3 py-0 mt-1' : 'h-16 w-48 px-4 py-0 p-0'}`}
        >
          <TailwindLogo link single={!sidebar?.isOpen} />
        </div>
        <Menu isOpen={sidebar?.isOpen} flags={flags} />
      </div>
    </aside>
  );
}
