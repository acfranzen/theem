import {
  BotMessageSquare,
  Code,
  File,
  LayoutGrid,
  LucideIcon,
  PieChart,
  Search,
} from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string, flags?: Record<string, boolean>): Group[] {
  const overviewMenus: Menu[] = [
    {
      href: '/lookup',
      label: 'Property Lookup',
      active: pathname.includes('/lookup'),
      icon: Search,
      submenus: [],
    },
  ];

  overviewMenus.push(
    {
      href: '/analytics',
      label: 'Analytics',
      active: pathname.includes('/analytics'),
      icon: PieChart,
      submenus: [],
    },
    {
      href: '',
      label: 'AI Assistant',
      active: false,
      icon: BotMessageSquare,
      submenus: [],
    }
  );

  if (flags?.portfolioLookup) {
    overviewMenus.push({
      href: '/portfolio/search',
      label: 'Portfolio Search',
      active: pathname.includes('/portfolio'),
      icon: File,
      submenus: [
        {
          href: '/portfolio/search',
          label: 'New',
          active: pathname.includes('/portfolio/search'),
        },
        {
          href: '/portfolio/all',
          label: 'All',
          active: pathname.includes('/portfolio/all'),
        },
      ],
    });
  }

  return [
    {
      groupLabel: 'Overview',
      menus: overviewMenus,
    },
    {
      groupLabel: 'Management',
      menus: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          active: pathname.includes('/dashboard'),
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: '/developer',
          label: 'Developer',
          active: pathname.includes('/developer'),
          icon: Code,
          submenus: [],
        },
      ],
    },
  ];
}
