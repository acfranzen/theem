'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Toggle } from '@/components/ui/toggle';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';

interface ThemePreviewProps {
  // No need to pass theme styles as props since they're applied globally
}

export default function ThemePreview({}: ThemePreviewProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [progress, setProgress] = useState(13);

  // Simulate progress bar advancement
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='w-full'>
      <div className='p-6'>
        <h2 className='text-2xl font-bold mb-6'>Component Preview</h2>

        <Tabs defaultValue='buttons-inputs' className='w-full'>
          <TabsList className='grid grid-cols-4 mb-8'>
            <TabsTrigger value='buttons-inputs'>Buttons & Inputs</TabsTrigger>
            <TabsTrigger value='layout'>Layout & Content</TabsTrigger>
            <TabsTrigger value='navigation'>Navigation & Feedback</TabsTrigger>
            <TabsTrigger value='data-display'>Data Display</TabsTrigger>
          </TabsList>

          {/* Buttons & Inputs Tab */}
          <TabsContent value='buttons-inputs' className='space-y-8'>
            <section>
              <h3 className='text-lg font-medium mb-4'>Buttons</h3>
              <div className='flex flex-wrap gap-4'>
                <Button>Primary</Button>
                <Button variant='secondary'>Secondary</Button>
                <Button variant='outline'>Outline</Button>
                <Button variant='ghost'>Ghost</Button>
                <Button variant='link'>Link</Button>
                <Button variant='destructive'>Destructive</Button>
              </div>
            </section>

            <Separator />

            <section>
              <h3 className='text-lg font-medium mb-4'>Toggles & Switches</h3>
              <div className='flex flex-wrap gap-4 items-center'>
                <Toggle aria-label='Toggle bold'>Bold</Toggle>
                <Toggle aria-label='Toggle italic'>Italic</Toggle>
                <Toggle aria-label='Toggle underline'>Underline</Toggle>
                <div className='flex items-center space-x-2 ml-4'>
                  <Label htmlFor='airplane-mode'>Airplane Mode</Label>
                  <Switch id='airplane-mode' />
                </div>
                <div className='flex items-center space-x-2'>
                  <Label htmlFor='dark-mode'>Dark Mode</Label>
                  <Switch id='dark-mode' />
                </div>
              </div>
            </section>

            <Separator />

            <Card>
              <CardHeader>
                <CardTitle>Form Elements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid md:grid-cols-2 gap-6'>
                  <div className='space-y-4'>
                    <div className='grid gap-2'>
                      <Label htmlFor='name'>Name</Label>
                      <Input id='name' placeholder='Enter your name' />
                    </div>

                    <div className='grid gap-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input id='email' type='email' placeholder='Enter your email' />
                    </div>

                    <div className='grid gap-2'>
                      <Label htmlFor='message'>Message</Label>
                      <Textarea id='message' placeholder='Type your message here' />
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div className='grid gap-2'>
                      <Label>Subscription</Label>
                      <RadioGroup defaultValue='monthly'>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='monthly' id='monthly' />
                          <Label htmlFor='monthly'>Monthly</Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='yearly' id='yearly' />
                          <Label htmlFor='yearly'>Yearly</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className='grid gap-2'>
                      <Label htmlFor='country'>Country</Label>
                      <Select>
                        <SelectTrigger id='country'>
                          <SelectValue placeholder='Select a country' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='us'>United States</SelectItem>
                          <SelectItem value='ca'>Canada</SelectItem>
                          <SelectItem value='uk'>United Kingdom</SelectItem>
                          <SelectItem value='au'>Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='grid gap-2'>
                      <Label>Price Range</Label>
                      <Slider defaultValue={[50]} max={100} step={1} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Layout & Content Tab */}
          <TabsContent value='layout' className='space-y-8'>
            <section>
              <h3 className='text-lg font-medium mb-4'>Cards</h3>
              <div className='grid md:grid-cols-2 gap-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description goes here</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Card content and information displayed here.</p>
                  </CardContent>
                  <CardFooter className='flex justify-between'>
                    <Button variant='ghost'>Cancel</Button>
                    <Button>Submit</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage how you receive notifications.</CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <Label htmlFor='email-notif'>Email notifications</Label>
                      <Switch id='email-notif' />
                    </div>
                    <div className='flex items-center justify-between'>
                      <Label htmlFor='sms-notif'>SMS notifications</Label>
                      <Switch id='sms-notif' />
                    </div>
                    <div className='flex items-center justify-between'>
                      <Label htmlFor='push-notif'>Push notifications</Label>
                      <Switch id='push-notif' />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator />

            <section>
              <h3 className='text-lg font-medium mb-4'>Accordion</h3>
              <Accordion type='single' collapsible className='w-full'>
                <AccordionItem value='item-1'>
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2'>
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that matches your theme.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-3'>
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It's animated by default, but you can disable it if you prefer.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <Separator />

            <section>
              <h3 className='text-lg font-medium mb-4'>Calendar</h3>
              <div className='inline-block rounded-md border'>
                <Calendar mode='single' selected={date} onSelect={setDate} />
              </div>
            </section>
          </TabsContent>

          {/* Navigation & Feedback Tab */}
          <TabsContent value='navigation' className='space-y-8'>
            <section>
              <h3 className='text-lg font-medium mb-4'>Alerts</h3>
              <div className='space-y-4'>
                <Alert>
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    This is an informational alert to notify you about something important.
                  </AlertDescription>
                </Alert>

                <Alert variant='destructive'>
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Something went wrong. Please try again later.</AlertDescription>
                </Alert>
              </div>
            </section>

            <Separator />

            <section>
              <h3 className='text-lg font-medium mb-4'>Progress</h3>
              <Progress value={progress} className='w-full' />
            </section>

            <Separator />

            <section>
              <h3 className='text-lg font-medium mb-4'>Menubar</h3>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>File</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      New Window <MenubarShortcut>⌘N</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      Print <MenubarShortcut>⌘P</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Edit</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      Cut <MenubarShortcut>⌘X</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Copy <MenubarShortcut>⌘C</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Paste <MenubarShortcut>⌘V</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>View</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      Zoom In <MenubarShortcut>⌘+</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Zoom Out <MenubarShortcut>⌘-</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </section>

            <Separator />

            <section>
              <h3 className='text-lg font-medium mb-4'>Dialogs & Popovers</h3>
              <div className='flex flex-wrap gap-4'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='outline'>Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent className='w-auto max-w-md mx-auto'>
                    <DialogHeader>
                      <DialogTitle>Dialog Title</DialogTitle>
                      <DialogDescription>
                        This is a dialog description. It provides more context about the dialog
                        content.
                      </DialogDescription>
                    </DialogHeader>
                    <div className='py-4'>
                      <p>
                        Dialog content goes here. This could be a form, information, or any other
                        content.
                      </p>
                    </div>
                    <DialogFooter>
                      <Button type='submit'>Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant='outline'>Open Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-80'>
                    <div className='grid gap-4'>
                      <div className='space-y-2'>
                        <h4 className='font-medium leading-none'>Dimensions</h4>
                        <p className='text-sm text-muted-foreground'>
                          Set the dimensions for the layer.
                        </p>
                      </div>
                      <div className='grid gap-2'>
                        <div className='grid grid-cols-3 items-center gap-4'>
                          <Label htmlFor='width'>Width</Label>
                          <Input id='width' defaultValue='100%' className='col-span-2 h-8' />
                        </div>
                        <div className='grid grid-cols-3 items-center gap-4'>
                          <Label htmlFor='height'>Height</Label>
                          <Input id='height' defaultValue='25px' className='col-span-2 h-8' />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline'>Open Dropdown</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </section>
          </TabsContent>

          {/* Data Display Tab */}
          <TabsContent value='data-display' className='space-y-8'>
            <section>
              <h3 className='text-lg font-medium mb-4'>Badges</h3>
              <div className='flex flex-wrap gap-2'>
                <Badge>Default</Badge>
                <Badge variant='secondary'>Secondary</Badge>
                <Badge variant='outline'>Outline</Badge>
                <Badge variant='destructive'>Destructive</Badge>
              </div>
            </section>

            <Separator />

            <section>
              <h3 className='text-lg font-medium mb-4'>Avatar</h3>
              <div className='flex gap-4'>
                <Avatar>
                  <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src='https://github.com/acfranzen.png' alt='@acfranzen' />
                  <AvatarFallback>AF</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            </section>

            <Separator />

            <section>
              <h3 className='text-lg font-medium mb-4'>Tooltip & HoverCard</h3>
              <div className='flex items-center gap-8'>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant='outline'>Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to library</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant='link'>@acfranzen</Button>
                  </HoverCardTrigger>
                  <HoverCardContent className='w-80'>
                    <div className='flex justify-between space-x-4'>
                      <Avatar>
                        <AvatarImage src='https://github.com/acfranzen.png' />
                        <AvatarFallback>AF</AvatarFallback>
                      </Avatar>
                      <div className='space-y-1'>
                        <h4 className='text-sm font-semibold'>@acfranzen</h4>
                        <p className='text-sm'>Founder and UI enthusiast.</p>
                        <div className='flex items-center pt-2'>
                          <span className='text-xs text-muted-foreground'>Joined August 2017</span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </section>

            <Separator />

            <section>
              <h3 className='text-lg font-medium mb-4'>Table</h3>
              <Table>
                <TableCaption>A list of recent invoices</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[100px]'>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className='text-right'>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className='font-medium'>INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className='text-right'>$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>INV002</TableCell>
                    <TableCell>Pending</TableCell>
                    <TableCell>PayPal</TableCell>
                    <TableCell className='text-right'>$125.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>INV003</TableCell>
                    <TableCell>Unpaid</TableCell>
                    <TableCell>Bank Transfer</TableCell>
                    <TableCell className='text-right'>$350.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
