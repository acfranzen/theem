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
import { Eye, EyeOff } from 'lucide-react';

// Import the component to variable map
import { componentToVariableMap } from '@/components/picker/theme-tooltip';

interface ThemePreviewProps {
  // No need to pass theme styles as props since they're applied globally
}

export default function ThemePreview({}: ThemePreviewProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [progress, setProgress] = useState(13);
  const [isInspectMode, setIsInspectMode] = useState(false);

  // Simulate progress bar advancement
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='w-full'>
      <div className='p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>Component Preview</h2>
          <div className='flex items-center gap-2'>
            <Label htmlFor='inspect-mode' className='cursor-pointer'>
              {isInspectMode ? (
                <span className='flex items-center text-primary'>
                  <Eye className='w-4 h-4 mr-1' />
                  Inspect Mode
                </span>
              ) : (
                <span className='flex items-center text-muted-foreground'>
                  <EyeOff className='w-4 h-4 mr-1' />
                  Inspect Mode
                </span>
              )}
            </Label>
            <Switch id='inspect-mode' checked={isInspectMode} onCheckedChange={setIsInspectMode} />
          </div>
        </div>

        {/* Render either the normal preview or the inspection preview */}
        {isInspectMode ? (
          <InspectionPreview date={date} setDate={setDate} progress={progress} />
        ) : (
          <NormalPreview date={date} setDate={setDate} progress={progress} />
        )}
      </div>
    </div>
  );
}

// Component version WITHOUT tooltips - for normal interactive use
function NormalPreview({
  date,
  setDate,
  progress,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  progress: number;
}) {
  return (
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
              <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
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
                    This is a dialog description. It provides more context about the dialog content.
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
  );
}

// Component version WITH tooltips - for inspection mode
function InspectionPreview({
  date,
  setDate,
  progress,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  progress: number;
}) {
  return (
    <div className='w-full'>
      <div className='p-4 my-4 text-muted-foreground text-center border border-dashed rounded-md'>
        <p>
          <strong>Note:</strong> Inspect mode shows static previews with theme variables.
          Interactive components like dropdowns, popovers, and hover cards won't function, but you
          can still inspect their theme variables. Toggle Inspect Mode off to use interactive
          components.
        </p>
      </div>
      <ThemeVariableDisplay component='tabs'>
        <div className='grid grid-cols-4 gap-2 mb-8'>
          <ThemeVariableDisplay component='tabs' name='Buttons & Inputs'>
            <div className='px-2 py-1.5 text-center border rounded-md cursor-not-allowed bg-muted text-primary'>
              Buttons & Inputs
            </div>
          </ThemeVariableDisplay>
          <ThemeVariableDisplay component='tabs' name='Layout & Content'>
            <div className='px-2 py-1.5 text-center border rounded-md cursor-not-allowed'>
              Layout & Content
            </div>
          </ThemeVariableDisplay>
          <ThemeVariableDisplay component='tabs' name='Navigation & Feedback'>
            <div className='px-2 py-1.5 text-center border rounded-md cursor-not-allowed'>
              Navigation & Feedback
            </div>
          </ThemeVariableDisplay>
          <ThemeVariableDisplay component='tabs' name='Data Display'>
            <div className='px-2 py-1.5 text-center border rounded-md cursor-not-allowed'>
              Data Display
            </div>
          </ThemeVariableDisplay>
        </div>
      </ThemeVariableDisplay>

      <div className='space-y-8'>
        {/* BUTTONS & INPUTS SECTION */}
        <section>
          <h3 className='text-lg font-medium mb-4'>Buttons</h3>
          <div className='flex flex-wrap gap-4'>
            <ThemeVariableDisplay component='button-primary'>
              <Button>Primary</Button>
            </ThemeVariableDisplay>
            <ThemeVariableDisplay component='button-secondary'>
              <Button variant='secondary'>Secondary</Button>
            </ThemeVariableDisplay>
            <ThemeVariableDisplay component='button-outline'>
              <Button variant='outline'>Outline</Button>
            </ThemeVariableDisplay>
            <ThemeVariableDisplay component='button-ghost'>
              <Button variant='ghost'>Ghost</Button>
            </ThemeVariableDisplay>
            <ThemeVariableDisplay component='button-link'>
              <Button variant='link'>Link</Button>
            </ThemeVariableDisplay>
            <ThemeVariableDisplay component='button-destructive'>
              <Button variant='destructive'>Destructive</Button>
            </ThemeVariableDisplay>
          </div>
        </section>

        <ThemeVariableDisplay component='separator'>
          <Separator />
        </ThemeVariableDisplay>

        <section>
          <h3 className='text-lg font-medium mb-4'>Toggles & Switches</h3>
          <div className='flex flex-wrap gap-4 items-center'>
            <ThemeVariableDisplay component='toggle'>
              <Toggle aria-label='Toggle bold'>Bold</Toggle>
            </ThemeVariableDisplay>
            <ThemeVariableDisplay component='toggle'>
              <Toggle aria-label='Toggle italic'>Italic</Toggle>
            </ThemeVariableDisplay>
            <ThemeVariableDisplay component='toggle'>
              <Toggle aria-label='Toggle underline'>Underline</Toggle>
            </ThemeVariableDisplay>
            <div className='flex items-center space-x-2 ml-4'>
              <ThemeVariableDisplay component='label'>
                <Label htmlFor='airplane-mode-inspect'>Airplane Mode</Label>
              </ThemeVariableDisplay>
              <ThemeVariableDisplay component='switch'>
                <Switch id='airplane-mode-inspect' />
              </ThemeVariableDisplay>
            </div>
            <div className='flex items-center space-x-2'>
              <ThemeVariableDisplay component='label'>
                <Label htmlFor='dark-mode-inspect'>Dark Mode</Label>
              </ThemeVariableDisplay>
              <ThemeVariableDisplay component='switch'>
                <Switch id='dark-mode-inspect' />
              </ThemeVariableDisplay>
            </div>
          </div>
        </section>

        <ThemeVariableDisplay component='separator'>
          <Separator />
        </ThemeVariableDisplay>

        <ThemeVariableDisplay component='card'>
          <Card>
            <ThemeVariableDisplay component='card-header'>
              <CardHeader>
                <CardTitle>Form Elements</CardTitle>
              </CardHeader>
            </ThemeVariableDisplay>
            <CardContent>
              <div className='grid md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div className='grid gap-2'>
                    <ThemeVariableDisplay component='label'>
                      <Label htmlFor='name-inspect'>Name</Label>
                    </ThemeVariableDisplay>
                    <ThemeVariableDisplay component='input'>
                      <Input id='name-inspect' placeholder='Enter your name' />
                    </ThemeVariableDisplay>
                  </div>

                  <div className='grid gap-2'>
                    <ThemeVariableDisplay component='label'>
                      <Label htmlFor='email-inspect'>Email</Label>
                    </ThemeVariableDisplay>
                    <ThemeVariableDisplay component='input'>
                      <Input id='email-inspect' type='email' placeholder='Enter your email' />
                    </ThemeVariableDisplay>
                  </div>

                  <div className='grid gap-2'>
                    <ThemeVariableDisplay component='label'>
                      <Label htmlFor='message-inspect'>Message</Label>
                    </ThemeVariableDisplay>
                    <ThemeVariableDisplay component='textarea'>
                      <Textarea id='message-inspect' placeholder='Type your message here' />
                    </ThemeVariableDisplay>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='grid gap-2'>
                    <ThemeVariableDisplay component='label'>
                      <Label>Subscription</Label>
                    </ThemeVariableDisplay>
                    <RadioGroup defaultValue='monthly'>
                      <div className='flex items-center space-x-2'>
                        <ThemeVariableDisplay component='radio'>
                          <RadioGroupItem value='monthly' id='monthly-inspect' />
                        </ThemeVariableDisplay>
                        <ThemeVariableDisplay component='label'>
                          <Label htmlFor='monthly-inspect'>Monthly</Label>
                        </ThemeVariableDisplay>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <ThemeVariableDisplay component='radio'>
                          <RadioGroupItem value='yearly' id='yearly-inspect' />
                        </ThemeVariableDisplay>
                        <ThemeVariableDisplay component='label'>
                          <Label htmlFor='yearly-inspect'>Yearly</Label>
                        </ThemeVariableDisplay>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className='grid gap-2'>
                    <ThemeVariableDisplay component='label'>
                      <Label htmlFor='country-inspect'>Country</Label>
                    </ThemeVariableDisplay>
                    <ThemeVariableDisplay component='select'>
                      <div className='border rounded-md px-3 py-2 text-sm bg-background'>
                        Select a country (inspection only)
                      </div>
                    </ThemeVariableDisplay>
                  </div>

                  <div className='grid gap-2'>
                    <ThemeVariableDisplay component='label'>
                      <Label>Price Range</Label>
                    </ThemeVariableDisplay>
                    <ThemeVariableDisplay component='slider'>
                      <Slider defaultValue={[50]} max={100} step={1} />
                    </ThemeVariableDisplay>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ThemeVariableDisplay>

        {/* LAYOUT & CONTENT SECTION */}
        <section>
          <h3 className='text-lg font-medium mb-4'>Cards</h3>
          <div className='grid md:grid-cols-2 gap-6'>
            <ThemeVariableDisplay component='card'>
              <Card>
                <ThemeVariableDisplay component='card-header'>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description goes here</CardDescription>
                  </CardHeader>
                </ThemeVariableDisplay>
                <CardContent>
                  <p>Card content and information displayed here.</p>
                </CardContent>
                <ThemeVariableDisplay component='card-footer'>
                  <CardFooter className='flex justify-between'>
                    <ThemeVariableDisplay component='button-ghost'>
                      <Button variant='ghost'>Cancel</Button>
                    </ThemeVariableDisplay>
                    <ThemeVariableDisplay component='button-primary'>
                      <Button>Submit</Button>
                    </ThemeVariableDisplay>
                  </CardFooter>
                </ThemeVariableDisplay>
              </Card>
            </ThemeVariableDisplay>

            <ThemeVariableDisplay component='card'>
              <Card>
                <ThemeVariableDisplay component='card-header'>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage how you receive notifications.</CardDescription>
                  </CardHeader>
                </ThemeVariableDisplay>
                <CardContent className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <ThemeVariableDisplay component='label'>
                      <Label htmlFor='email-notif-inspect'>Email notifications</Label>
                    </ThemeVariableDisplay>
                    <ThemeVariableDisplay component='switch'>
                      <Switch id='email-notif-inspect' />
                    </ThemeVariableDisplay>
                  </div>
                  <div className='flex items-center justify-between'>
                    <ThemeVariableDisplay component='label'>
                      <Label htmlFor='sms-notif-inspect'>SMS notifications</Label>
                    </ThemeVariableDisplay>
                    <ThemeVariableDisplay component='switch'>
                      <Switch id='sms-notif-inspect' />
                    </ThemeVariableDisplay>
                  </div>
                  <div className='flex items-center justify-between'>
                    <ThemeVariableDisplay component='label'>
                      <Label htmlFor='push-notif-inspect'>Push notifications</Label>
                    </ThemeVariableDisplay>
                    <ThemeVariableDisplay component='switch'>
                      <Switch id='push-notif-inspect' />
                    </ThemeVariableDisplay>
                  </div>
                </CardContent>
              </Card>
            </ThemeVariableDisplay>
          </div>
        </section>

        <ThemeVariableDisplay component='separator'>
          <Separator />
        </ThemeVariableDisplay>

        <section>
          <h3 className='text-lg font-medium mb-4'>Accordion</h3>
          <ThemeVariableDisplay component='accordion'>
            <div className='border rounded-md'>
              <div className='border-b px-4 py-3 flex justify-between items-center'>
                <div>Is it accessible?</div>
                <div>+</div>
              </div>
              <div className='px-4 py-3'>Yes. It adheres to the WAI-ARIA design pattern.</div>
            </div>
          </ThemeVariableDisplay>
        </section>

        <ThemeVariableDisplay component='separator'>
          <Separator />
        </ThemeVariableDisplay>

        <section>
          <h3 className='text-lg font-medium mb-4'>Calendar</h3>
          <div className='inline-block rounded-md border'>
            <Calendar mode='single' selected={date} onSelect={() => {}} />
          </div>
        </section>

        {/* NAVIGATION & FEEDBACK SECTION */}
        <section>
          <h3 className='text-lg font-medium mb-4'>Alerts</h3>
          <div className='space-y-4'>
            <ThemeVariableDisplay component='alert-default'>
              <Alert>
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  This is an informational alert to notify you about something important.
                </AlertDescription>
              </Alert>
            </ThemeVariableDisplay>

            <ThemeVariableDisplay component='alert-destructive'>
              <Alert variant='destructive'>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong. Please try again later.</AlertDescription>
              </Alert>
            </ThemeVariableDisplay>
          </div>
        </section>

        <ThemeVariableDisplay component='separator'>
          <Separator />
        </ThemeVariableDisplay>

        <section>
          <h3 className='text-lg font-medium mb-4'>Progress</h3>
          <ThemeVariableDisplay component='progress'>
            <Progress value={progress} className='w-full' />
          </ThemeVariableDisplay>
        </section>

        <ThemeVariableDisplay component='separator'>
          <Separator />
        </ThemeVariableDisplay>

        <section>
          <h3 className='text-lg font-medium mb-4'>Menubar</h3>
          <ThemeVariableDisplay component='menubar'>
            <div className='flex border rounded-md'>
              <div className='px-4 py-2 hover:bg-accent cursor-not-allowed'>File</div>
              <div className='px-4 py-2 hover:bg-accent cursor-not-allowed'>Edit</div>
              <div className='px-4 py-2 hover:bg-accent cursor-not-allowed'>View</div>
            </div>
          </ThemeVariableDisplay>
        </section>

        <ThemeVariableDisplay component='separator'>
          <Separator />
        </ThemeVariableDisplay>

        <section>
          <h3 className='text-lg font-medium mb-4'>Dialogs & Popovers</h3>
          <div className='flex flex-wrap gap-4'>
            <ThemeVariableDisplay component='dialog'>
              <ThemeVariableDisplay component='button-outline'>
                <Button variant='outline'>Dialog (Inspect Only)</Button>
              </ThemeVariableDisplay>
            </ThemeVariableDisplay>

            <ThemeVariableDisplay component='popover'>
              <ThemeVariableDisplay component='button-outline'>
                <Button variant='outline'>Popover (Inspect Only)</Button>
              </ThemeVariableDisplay>
            </ThemeVariableDisplay>

            <ThemeVariableDisplay component='dropdown'>
              <ThemeVariableDisplay component='button-outline'>
                <Button variant='outline'>Dropdown (Inspect Only)</Button>
              </ThemeVariableDisplay>
            </ThemeVariableDisplay>
          </div>
        </section>

        {/* DATA DISPLAY SECTION */}
        <section>
          <h3 className='text-lg font-medium mb-4'>Badges</h3>
          <div className='flex flex-wrap gap-2'>
            <ThemeVariableDisplay component='badge-default'>
              <Badge>Default</Badge>
            </ThemeVariableDisplay>
            <ThemeVariableDisplay component='badge-secondary'>
              <Badge variant='secondary'>Secondary</Badge>
            </ThemeVariableDisplay>
            <ThemeVariableDisplay component='badge-outline'>
              <Badge variant='outline'>Outline</Badge>
            </ThemeVariableDisplay>
            <ThemeVariableDisplay component='badge-destructive'>
              <Badge variant='destructive'>Destructive</Badge>
            </ThemeVariableDisplay>
          </div>
        </section>

        <ThemeVariableDisplay component='separator'>
          <Separator />
        </ThemeVariableDisplay>

        <section>
          <h3 className='text-lg font-medium mb-4'>Avatar</h3>
          <div className='flex gap-4'>
            <ThemeVariableDisplay component='avatar'>
              <Avatar>
                <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </ThemeVariableDisplay>
            <ThemeVariableDisplay component='avatar'>
              <Avatar>
                <AvatarImage src='https://github.com/acfranzen.png' alt='@acfranzen' />
                <AvatarFallback>AF</AvatarFallback>
              </Avatar>
            </ThemeVariableDisplay>
            <ThemeVariableDisplay component='avatar'>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </ThemeVariableDisplay>
          </div>
        </section>

        <ThemeVariableDisplay component='separator'>
          <Separator />
        </ThemeVariableDisplay>

        <section>
          <h3 className='text-lg font-medium mb-4'>Tooltip & HoverCard</h3>
          <div className='flex items-center gap-8'>
            <ThemeVariableDisplay component='tooltip'>
              <ThemeVariableDisplay component='button-outline'>
                <Button variant='outline'>Tooltip (Inspect Only)</Button>
              </ThemeVariableDisplay>
            </ThemeVariableDisplay>

            <ThemeVariableDisplay component='hover-card'>
              <ThemeVariableDisplay component='button-link'>
                <Button variant='link'>@acfranzen (Inspect Only)</Button>
              </ThemeVariableDisplay>
            </ThemeVariableDisplay>
          </div>
        </section>

        <ThemeVariableDisplay component='separator'>
          <Separator />
        </ThemeVariableDisplay>

        <section>
          <h3 className='text-lg font-medium mb-4'>Table</h3>
          <ThemeVariableDisplay component='table'>
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
              </TableBody>
            </Table>
          </ThemeVariableDisplay>
        </section>
      </div>
    </div>
  );
}

// A simpler component just for displaying theme variables
function ThemeVariableDisplay({
  component,
  children,
  name,
}: {
  component: string;
  children?: React.ReactNode;
  name?: string;
}) {
  const cssVariables = componentToVariableMap[component] || [];
  const [showTooltip, setShowTooltip] = useState(false);
  const [variableValues, setVariableValues] = useState<
    Array<{ name: string; value: string; color: string }>
  >([]);

  // Format component name for display
  const displayName =
    name ||
    component
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  // Get the computed CSS variable values
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);

      const values = cssVariables.map((variable: string) => {
        const rawValue = computedStyle.getPropertyValue(variable).trim();

        // For color visualization, get the actual color by creating a test element
        let colorValue = '';

        // Only try to get color for variables that might be colors (not radius)
        if (!variable.includes('radius')) {
          try {
            // Create a temporary element to compute the color
            const tempEl = document.createElement('div');
            // Set the background color using the variable
            tempEl.style.cssText = `background-color: var(${variable});`;
            document.body.appendChild(tempEl);
            // Get computed background-color which should return an RGB value
            colorValue = getComputedStyle(tempEl).backgroundColor;
            document.body.removeChild(tempEl);
          } catch (e) {
            // If it fails, leave color empty
            colorValue = '';
          }
        }

        return {
          name: variable,
          value: rawValue || 'Not set',
          color: colorValue,
        };
      });

      setVariableValues(values);
    }
  }, [cssVariables]);

  return (
    <div
      className='relative'
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}

      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            transform: 'translate(-50%, -100%)',
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '8px',
            zIndex: 1000,
            fontSize: '12px',
            minWidth: '200px',
            maxWidth: '300px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          <div
            style={{
              fontWeight: 'bold',
              marginBottom: '8px',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '4px',
            }}
          >
            {displayName}
          </div>

          {variableValues.length > 0 ? (
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {variableValues.map(variable => (
                <li
                  key={variable.name}
                  style={{
                    marginBottom: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <code
                    style={{
                      fontFamily: 'monospace',
                      backgroundColor: 'var(--muted)',
                      padding: '2px 4px',
                      borderRadius: '3px',
                      fontSize: '10px',
                      maxWidth: '160px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {variable.name}
                  </code>

                  {variable.color && (
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: variable.color,
                        borderRadius: '3px',
                        border: '1px solid var(--border)',
                        flexShrink: 0,
                      }}
                      title={`${variable.name}: ${variable.value}`}
                    />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ margin: 0 }}>No specific theme variables</p>
          )}
        </div>
      )}
    </div>
  );
}
