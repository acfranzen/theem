'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X } from 'lucide-react';
import { colorThemes } from './colorThemes';

interface FloatingColorPickerProps {
  colorScheme: keyof typeof colorThemes;
  handleColorChange: (color: keyof typeof colorThemes) => void;
  isVisible: boolean;
}

export default function FloatingColorPicker({
  colorScheme,
  handleColorChange,
  isVisible,
}: FloatingColorPickerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className='fixed bottom-4 right-4 z-50'
        >
          <motion.div
            className={`rounded-full p-0.5 bg-gradient-to-r ${colorThemes[colorScheme].gradient} shadow-lg`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className='bg-background rounded-full p-2 flex items-center'>
              <AnimatePresence mode='wait'>
                {isExpanded ? (
                  <motion.div
                    key='expanded'
                    initial={{ width: 40, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 40, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='flex items-center space-x-2 px-1'
                  >
                    <div className='flex items-center space-x-1'>
                      {Object.keys(colorThemes).map(color => (
                        <button
                          key={color}
                          className={`h-7 w-7 rounded-full transition-transform duration-200 ease-in-out ${
                            colorScheme === color
                              ? 'ring-2 ring-offset-1 ring-offset-background ring-primary scale-110'
                              : 'hover:scale-110'
                          }`}
                          style={{
                            backgroundColor: `hsl(${colorThemes[color as keyof typeof colorThemes].primary})`,
                          }}
                          onClick={() => handleColorChange(color as keyof typeof colorThemes)}
                          aria-label={`Change theme to ${color}`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={toggleExpanded}
                      className='ml-2 p-1.5 rounded-full hover:bg-muted transition-colors'
                      aria-label='Hide color options'
                    >
                      <X size={16} className='text-muted-foreground' />
                    </button>
                  </motion.div>
                ) : (
                  <motion.button
                    key='collapsed'
                    onClick={toggleExpanded}
                    className='p-1.5 rounded-full hover:bg-muted transition-colors flex items-center justify-center'
                    aria-label='Show color options'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Palette
                      size={18}
                      className={`text-[hsl(${colorThemes[colorScheme].primary})]`}
                    />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
