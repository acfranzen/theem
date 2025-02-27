'use client';

import { cn } from '@/lib/utils';
import { useSidebarToggle } from 'src/hooks/use-sidebar-toggle';
import { useStore } from 'src/hooks/use-store';

import { Sidebar } from './sidebar';

export default function AdminPanelLayout({
  children,
  RightSidebarComponent,
  flags,
}: {
  children: React.ReactNode;
  RightSidebarComponent?: React.ComponentType; // Accept a component
  flags?: Record<string, boolean>;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <div className="bg-background">
      <Sidebar flags={flags} />
      <main
        className={cn(
          'min-h-100vh bg-background transition-[margin-left] ease-in-out duration-300',
          sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72'
        )}
      >
        {children}
      </main>
      {RightSidebarComponent && (
        <aside className="hidden xl:block xl:w-80 border-l border-gray-200">
          <RightSidebarComponent />
        </aside>
      )}
    </div>
  );
}
