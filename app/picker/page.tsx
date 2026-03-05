import { StyleProvider } from '@/lib/picker/style-context';
import ThemeCreator from '@/components/picker/theme-creator';

export default function Home() {
  return (
    <StyleProvider>
      <main className='min-h-screen'>
        <ThemeCreator />
      </main>
    </StyleProvider>
  );
}
