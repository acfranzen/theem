'use client';

import { StyleProvider } from '@/lib/picker/style-context';
import ThemeCreator from '@/components/picker/theme-creator';

export default function ThemeTestPage() {
  return (
    <StyleProvider>
      <main>
        <ThemeCreator />
      </main>
    </StyleProvider>
  );
}
