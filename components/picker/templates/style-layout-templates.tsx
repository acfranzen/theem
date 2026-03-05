import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StyleProfileId } from '@/lib/style-system/types';

interface StyleLayoutTemplatesProps {
  styleProfile: StyleProfileId;
}

const inboxRows = [
  { from: 'Design Ops', subject: 'Updated component states', tag: 'UI' },
  { from: 'Infra', subject: 'Staging sync complete', tag: 'Deploy' },
  { from: 'Product', subject: 'Review style snapshots', tag: 'Review' },
  { from: 'QA', subject: 'Motion accessibility checks', tag: 'A11y' },
];

const chatRows = [
  { who: 'System', body: 'Preview rebuilt with style-aware primitives.' },
  { who: 'Alex', body: 'Keeping IA fixed while swapping style grammar works.' },
  { who: 'You', body: 'Ship minimal swiss, glassmorphism, neubrutalism this pass.' },
];

export function StyleLayoutTemplates({ styleProfile }: StyleLayoutTemplatesProps) {
  return (
    <section className='space-y-[var(--style-spacing-md)] mb-8'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>Layout Templates</h3>
        <Badge variant='outline'>{styleProfile}</Badge>
      </div>

      <Tabs defaultValue='dashboard' className='w-full' styleProfile={styleProfile}>
        <TabsList className='grid grid-cols-3 w-full' styleProfile={styleProfile}>
          <TabsTrigger value='dashboard' styleProfile={styleProfile}>
            Dashboard
          </TabsTrigger>
          <TabsTrigger value='mail' styleProfile={styleProfile}>
            Mail List
          </TabsTrigger>
          <TabsTrigger value='chat' styleProfile={styleProfile}>
            Chat Window
          </TabsTrigger>
        </TabsList>

        <TabsContent value='dashboard'>
          <div className='grid gap-[var(--style-spacing-md)] md:grid-cols-3'>
            <Card className='md:col-span-2 style-surface-panel' styleProfile={styleProfile}>
              <CardHeader>
                <CardTitle>Revenue Snapshot</CardTitle>
              </CardHeader>
              <CardContent className='grid grid-cols-3 gap-[var(--style-spacing-sm)]'>
                <Metric label='MRR' value='$84.2k' />
                <Metric label='Growth' value='+12.8%' />
                <Metric label='Churn' value='1.9%' />
              </CardContent>
            </Card>
            <Card className='style-surface-panel' styleProfile={styleProfile}>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col gap-[var(--style-spacing-sm)]'>
                <Button styleProfile={styleProfile}>Create Report</Button>
                <Button variant='secondary' styleProfile={styleProfile}>
                  Invite Team
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='mail'>
          <Card className='style-surface-panel' styleProfile={styleProfile}>
            <CardHeader className='flex-row items-center justify-between space-y-0'>
              <CardTitle>Inbox</CardTitle>
              <Input placeholder='Search mail...' className='max-w-xs' styleProfile={styleProfile} />
            </CardHeader>
            <CardContent className='space-y-[var(--style-spacing-sm)]'>
              {inboxRows.map(row => (
                <div
                  key={`${row.from}-${row.subject}`}
                  className='grid grid-cols-[1fr_auto] items-center gap-[var(--style-spacing-sm)] rounded-[var(--style-radius-sm)] border p-[var(--style-spacing-sm)]'
                >
                  <div>
                    <p className='text-sm font-semibold'>{row.from}</p>
                    <p className='text-xs text-muted-foreground'>{row.subject}</p>
                  </div>
                  <Badge>{row.tag}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='chat'>
          <Card className='style-surface-panel' styleProfile={styleProfile}>
            <CardHeader>
              <CardTitle>Conversation</CardTitle>
            </CardHeader>
            <CardContent className='space-y-[var(--style-spacing-sm)]'>
              <ScrollArea className='h-52 rounded-[var(--style-radius-sm)] border p-[var(--style-spacing-sm)]'>
                <div className='space-y-[var(--style-spacing-sm)]'>
                  {chatRows.map(row => (
                    <div key={row.body} className='flex gap-[var(--style-spacing-sm)]'>
                      <Avatar className='h-8 w-8'>
                        <AvatarFallback>{row.who.slice(0, 1)}</AvatarFallback>
                      </Avatar>
                      <div className='rounded-[var(--style-radius-sm)] border px-3 py-2 text-sm'>
                        <p className='font-semibold'>{row.who}</p>
                        <p className='text-muted-foreground'>{row.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className='flex gap-[var(--style-spacing-sm)]'>
                <Input placeholder='Write a message...' styleProfile={styleProfile} />
                <Button styleProfile={styleProfile}>Send</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className='rounded-[var(--style-radius-sm)] border p-[var(--style-spacing-sm)]'>
      <p className='text-xs uppercase tracking-[0.06em] text-muted-foreground'>{label}</p>
      <p className='text-xl font-semibold'>{value}</p>
    </div>
  );
}
