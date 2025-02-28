'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { Star, Trash2, Edit, Check, X, Plus } from 'lucide-react';
import { saveTheme, updateTheme, removeTheme, ThemeData } from '@/lib/services/theme-service';
import {
  ThemeMode,
  ThemeColors,
  getActiveThemeMode,
  applyThemeToDOM,
  toCamelCase,
} from '@/lib/picker/theme-utils';
import { useTheme } from 'next-themes';

interface ThemeManagerProps {
  themes: ThemeData[];
  currentTheme: Record<ThemeMode, ThemeColors>;
  onSelectTheme: (theme: ThemeData) => void;
}

export default function ThemeManager({ themes, currentTheme, onSelectTheme }: ThemeManagerProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeData | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [themeName, setThemeName] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localThemes, setLocalThemes] = useState<ThemeData[]>(themes);
  const { theme: nextTheme } = useTheme();

  // Update local themes when prop changes
  useEffect(() => {
    setLocalThemes(themes);
  }, [themes]);

  const handleSaveTheme = async () => {
    if (!themeName.trim()) {
      toast.error('Theme name required', {
        description: 'Please enter a name for your theme',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const activeMode = getActiveThemeMode(nextTheme);

      const themeToSave: ThemeData = {
        name: themeName,
        isDefault,
        light: currentTheme.light as unknown as Record<string, string>,
        dark: currentTheme.dark as unknown as Record<string, string>,
      };

      const savedTheme = await saveTheme(themeToSave);

      if (savedTheme) {
        setLocalThemes(prev => [...prev, savedTheme]);
        toast.success('Theme saved', {
          description: `"${themeName}" has been saved to your themes`,
        });
        setIsSaveDialogOpen(false);
        setThemeName('');
        setIsDefault(false);
      } else {
        toast.error('Error saving theme', {
          description: 'There was a problem saving your theme. Please try again.',
        });
      }
    } catch (error) {
      toast.error('Error saving theme', {
        description: 'There was a problem saving your theme. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTheme = async () => {
    if (!selectedTheme || !selectedTheme.id) return;
    if (!themeName.trim()) {
      toast.error('Theme name required', {
        description: 'Please enter a name for your theme',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const updates: Partial<ThemeData> = {
        name: themeName,
        isDefault,
      };

      const updatedTheme = await updateTheme(selectedTheme.id, updates);

      if (updatedTheme) {
        setLocalThemes(prev => prev.map(t => (t.id === updatedTheme.id ? updatedTheme : t)));
        toast.success('Theme updated', {
          description: `"${themeName}" has been updated`,
        });
        setIsEditDialogOpen(false);
        setSelectedTheme(null);
        setThemeName('');
        setIsDefault(false);
      } else {
        toast.error('Error updating theme', {
          description: 'There was a problem updating your theme. Please try again.',
        });
      }
    } catch (error) {
      toast.error('Error updating theme', {
        description: 'There was a problem updating your theme. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTheme = async () => {
    if (!selectedTheme || !selectedTheme.id) return;

    setIsSubmitting(true);
    try {
      const success = await removeTheme(selectedTheme.id);

      if (success) {
        setLocalThemes(prev => prev.filter(t => t.id !== selectedTheme.id));
        toast.success('Theme deleted', {
          description: `"${selectedTheme.name}" has been deleted`,
        });
        setIsDeleteDialogOpen(false);
        setSelectedTheme(null);
      } else {
        toast.error('Error deleting theme', {
          description: 'There was a problem deleting your theme. Please try again.',
        });
      }
    } catch (error) {
      toast.error('Error deleting theme', {
        description: 'There was a problem deleting your theme. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditDialog = (theme: ThemeData) => {
    setSelectedTheme(theme);
    setThemeName(theme.name);
    setIsDefault(theme.isDefault || false);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (theme: ThemeData) => {
    setSelectedTheme(theme);
    setIsDeleteDialogOpen(true);
  };

  const openSaveDialog = () => {
    setThemeName('My Custom Theme');
    setIsDefault(false);
    setIsSaveDialogOpen(true);
  };

  return (
    <div className='w-full space-y-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>My Themes</h2>
        <Button onClick={openSaveDialog}>
          <Plus className='h-4 w-4 mr-2' />
          Save Current Theme
        </Button>
      </div>

      <Separator />

      {localThemes.length === 0 ? (
        <div className='py-8 text-center'>
          <p className='text-muted-foreground'>
            No saved themes yet. Create and save your first theme!
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {localThemes.map(theme => (
            <Card key={theme.id} className='relative'>
              <CardHeader className='pb-2'>
                <div className='flex justify-between items-start'>
                  <CardTitle className='mr-6'>{theme.name}</CardTitle>
                  {theme.isDefault && (
                    <div className='absolute top-4 right-4 text-primary'>
                      <Star className='h-5 w-5 fill-primary' />
                    </div>
                  )}
                </div>
                <CardDescription>
                  {theme.isDefault ? 'Default theme' : 'Custom theme'}
                </CardDescription>
              </CardHeader>

              <CardContent className='pb-2'>
                <div className='flex space-x-2 mb-3'>
                  {/* Primary color swatch */}
                  <div className='flex flex-col items-center'>
                    <div
                      className='w-10 h-10 rounded-md border'
                      style={{ backgroundColor: `hsl(${theme.light.primary})` }}
                    />
                    <span className='text-xs mt-1'>Primary</span>
                  </div>

                  {/* Secondary color swatch */}
                  <div className='flex flex-col items-center'>
                    <div
                      className='w-10 h-10 rounded-md border'
                      style={{ backgroundColor: `hsl(${theme.light.secondary})` }}
                    />
                    <span className='text-xs mt-1'>Secondary</span>
                  </div>

                  {/* Background color swatch */}
                  <div className='flex flex-col items-center'>
                    <div
                      className='w-10 h-10 rounded-md border'
                      style={{ backgroundColor: `hsl(${theme.light.background})` }}
                    />
                    <span className='text-xs mt-1'>Background</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className='flex justify-between'>
                <Button variant='outline' size='sm' onClick={() => onSelectTheme(theme)}>
                  Use Theme
                </Button>
                <div className='space-x-2'>
                  <Button variant='ghost' size='icon' onClick={() => openEditDialog(theme)}>
                    <Edit className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='text-destructive hover:text-destructive'
                    onClick={() => openDeleteDialog(theme)}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Save Theme Dialog */}
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Theme</DialogTitle>
            <DialogDescription>Save your current theme to your collection.</DialogDescription>
          </DialogHeader>

          <div className='space-y-4 py-2'>
            <div className='space-y-2'>
              <Label htmlFor='theme-name'>Theme Name</Label>
              <Input
                id='theme-name'
                value={themeName}
                onChange={e => setThemeName(e.target.value)}
                placeholder='My Custom Theme'
              />
            </div>

            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                id='is-default'
                checked={isDefault}
                onChange={e => setIsDefault(e.target.checked)}
                className='h-4 w-4 rounded border-gray-300'
              />
              <Label htmlFor='is-default'>Set as default theme</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant='outline' onClick={() => setIsSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTheme} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Theme'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Theme Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Theme</DialogTitle>
            <DialogDescription>Update your theme details.</DialogDescription>
          </DialogHeader>

          <div className='space-y-4 py-2'>
            <div className='space-y-2'>
              <Label htmlFor='edit-theme-name'>Theme Name</Label>
              <Input
                id='edit-theme-name'
                value={themeName}
                onChange={e => setThemeName(e.target.value)}
              />
            </div>

            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                id='edit-is-default'
                checked={isDefault}
                onChange={e => setIsDefault(e.target.checked)}
                className='h-4 w-4 rounded border-gray-300'
              />
              <Label htmlFor='edit-is-default'>Set as default theme</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant='outline' onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateTheme} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Update Theme'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Theme Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Theme</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedTheme?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant='outline' onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleDeleteTheme} disabled={isSubmitting}>
              {isSubmitting ? 'Deleting...' : 'Delete Theme'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
