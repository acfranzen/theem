"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColorPicker from "@/components/picker/color-picker";

// Default theme values
const defaultTheme = {
  background: "0 0% 100%",
  foreground: "222.2 47.4% 11.2%",
  card: "0 0% 100%",
  "card-foreground": "222.2 47.4% 11.2%",
  popover: "0 0% 100%",
  "popover-foreground": "222.2 47.4% 11.2%",
  primary: "222.2 47.4% 11.2%",
  "primary-foreground": "210 40% 98%",
  secondary: "210 40% 96.1%",
  "secondary-foreground": "222.2 47.4% 11.2%",
  muted: "210 40% 96.1%",
  "muted-foreground": "215.4 16.3% 46.9%",
  accent: "210 40% 96.1%",
  "accent-foreground": "222.2 47.4% 11.2%",
  destructive: "0 84.2% 60.2%",
  "destructive-foreground": "210 40% 98%",
  border: "214.3 31.8% 91.4%",
  input: "214.3 31.8% 91.4%",
  ring: "215 20.2% 65.1%",
  radius: "0.5rem",
};

export default function ThemeCreator() {
  const [theme, setTheme] = useState(defaultTheme);
  const [copied, setCopied] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleColorChange = (key: string, value: string) => {
    setTheme((prev) => ({ ...prev, [key]: value }));
  };

  const generateThemeCode = () => {
    let code = `:root {\n`;
    Object.entries(theme).forEach(([key, value]) => {
      if (key === "radius") {
        code += `  --${key}: ${value};\n`;
      } else {
        code += `  --${key}: ${value};\n`;
      }
    });
    code += `}\n`;
    return code;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateThemeCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast("Theme code has been copied to your clipboard");
  };

  // Generate inline styles for the preview container
  const previewStyles = Object.entries(theme).reduce((styles, [key, value]) => {
    if (key === "radius") {
      styles[`--${key}`] = value;
    } else {
      styles[`--${key}`] = value;
    }
    return styles;
  }, {} as Record<string, string>);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4">
          <h1 className="text-2xl font-bold">ShadCN Theme Creator</h1>
          <div className="flex items-center gap-4">
            <Button onClick={copyToClipboard} variant="outline" size="sm">
              {copied ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              Copy Code
            </Button>
            <Button size="sm">Generate Theme</Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Left side - Color pickers */}
        <div className="w-full md:w-1/3 border-r">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Theme Properties</h2>
            <Textarea
              className="mb-4 h-24 font-mono text-sm"
              placeholder="Theme description..."
              defaultValue="A theme inspired by modern design principles. Clean and professional with a touch of personality."
            />

            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-4 pr-4">
                {/* Color pickers */}
                {Object.entries(theme).map(([key, value]) => (
                  <ColorPicker
                    key={key}
                    label={key}
                    value={value}
                    onChange={(newValue) => handleColorChange(key, newValue)}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Right side - Component preview */}
        <div className="w-full md:w-2/3">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Component Preview</h2>

            {/* Apply the theme to this container */}
            <div style={previewStyles}>
              <div className="space-y-10">
                <section>
                  <h3 className="text-lg font-medium mb-4">Buttons</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-medium mb-4">Cards</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>
                          Card description goes here
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>Card content and information displayed here.</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="ghost">Cancel</Button>
                        <Button>Submit</Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Settings</CardTitle>
                        <CardDescription>
                          Manage how you receive notifications.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email">Email notifications</Label>
                          <Switch id="email" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sms">SMS notifications</Label>
                          <Switch id="sms" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push">Push notifications</Label>
                          <Switch id="push" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-medium mb-4">Alerts</h3>
                  <div className="space-y-4">
                    <Alert>
                      <AlertTitle>Information</AlertTitle>
                      <AlertDescription>
                        This is an informational alert to notify you about
                        something important.
                      </AlertDescription>
                    </Alert>

                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        Something went wrong. Please try again later.
                      </AlertDescription>
                    </Alert>
                  </div>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-medium mb-4">Form Elements</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Enter your name" />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Type your message here"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label>Subscription</Label>
                        <RadioGroup defaultValue="monthly">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="monthly" id="monthly" />
                            <Label htmlFor="monthly">Monthly</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yearly" id="yearly" />
                            <Label htmlFor="yearly">Yearly</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="country">Country</Label>
                        <Select>
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <Label>Price Range</Label>
                        <Slider defaultValue={[50]} max={100} step={1} />
                      </div>
                    </div>
                  </div>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-medium mb-4">Calendar</h3>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-medium mb-4">
                    Dialogs & Popovers
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Open Dialog</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Dialog Title</DialogTitle>
                          <DialogDescription>
                            This is a dialog description. It provides more
                            context about the dialog content.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <p>
                            Dialog content goes here. This could be a form,
                            information, or any other content.
                          </p>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">Open Popover</Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">
                              Dimensions
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Set the dimensions for the layer.
                            </p>
                          </div>
                          <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="width">Width</Label>
                              <Input
                                id="width"
                                defaultValue="100%"
                                className="col-span-2 h-8"
                              />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="height">Height</Label>
                              <Input
                                id="height"
                                defaultValue="25px"
                                className="col-span-2 h-8"
                              />
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </section>

                <Separator />

                <section>
                  <h3 className="text-lg font-medium mb-4">Badges</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
