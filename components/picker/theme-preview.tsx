'use client';

import { useState } from 'react';
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

interface ThemePreviewProps {
  // No need to pass theme styles as props since they're applied globally
}

export default function ThemePreview({}: ThemePreviewProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className='w-full '>
      <div className='p-6'>
        <h2 className='text-2xl font-bold mb-6'>Component Preview</h2>

        {/* Apply the theme to this container */}
        <div className='space-y-10'>
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
                    <Label htmlFor='email'>Email notifications</Label>
                    <Switch id='email' />
                  </div>
                  <div className='flex items-center justify-between'>
                    <Label htmlFor='sms'>SMS notifications</Label>
                    <Switch id='sms' />
                  </div>
                  <div className='flex items-center justify-between'>
                    <Label htmlFor='push'>Push notifications</Label>
                    <Switch id='push' />
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

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
            <h3 className='text-lg font-medium mb-4'>Form Elements</h3>
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
          </section>

          <Separator />

          <section>
            <h3 className='text-lg font-medium mb-4'>Calendar</h3>
            <div className='inline-block rounded-md border'>
              <Calendar mode='single' selected={date} onSelect={setDate} />
            </div>
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
            </div>
          </section>

          <Separator />

          <section>
            <h3 className='text-lg font-medium mb-4'>Badges</h3>
            <div className='flex flex-wrap gap-2'>
              <Badge>Default</Badge>
              <Badge variant='secondary'>Secondary</Badge>
              <Badge variant='outline'>Outline</Badge>
              <Badge variant='destructive'>Destructive</Badge>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
