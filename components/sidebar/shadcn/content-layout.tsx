import { Navbar } from './navbar';

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
  flags?: Record<string, boolean>;
}

export function ContentLayout({ title, children, flags }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} flags={flags} />
      <div className="pt-8 pb-8 px-4 sm:px-8">{children}</div>
    </div>
  );
}
