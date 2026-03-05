'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Component } from 'lucide-react';
import DashboardPreview from './dashboard-preview';
import ThemePreview from '@/components/picker/theme-preview';
import StyleRenderer from '@/components/picker/renderers/style-renderer';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PreviewSwitcher() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex flex-col h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1">
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Live Preview
          </h2>
          <TabsList className="h-7">
            <TabsTrigger value="dashboard" className="text-xs gap-1.5 px-2.5 h-6">
              <LayoutDashboard className="w-3 h-3" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="components" className="text-xs gap-1.5 px-2.5 h-6">
              <Component className="w-3 h-3" />
              Components
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="flex-1 m-0 px-4 pb-4">
          <StyleRenderer className="h-full">
            <DashboardPreview />
          </StyleRenderer>
        </TabsContent>

        <TabsContent value="components" className="flex-1 m-0">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <StyleRenderer className="p-4">
              <ThemePreview />
            </StyleRenderer>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
