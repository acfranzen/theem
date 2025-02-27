import ThemeCreator from '@/components/picker/theme-creator';
import { ContentLayout } from '@/components/sidebar/shadcn/content-layout';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <ThemeCreator />
    </main>
  );
}
