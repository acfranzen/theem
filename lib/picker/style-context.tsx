'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import { StyleId, StyleProfile, CompositionConfig, SurfaceConfig, TokenBundle } from './style-types';
import { styleProfiles, getStyleProfile } from './style-profiles';

const STORAGE_KEY = 'theem-style';

interface StyleContextValue {
  activeStyle: StyleId;
  profile: StyleProfile;
  setActiveStyle: (id: StyleId) => void;
  // Per-layer overrides
  tokenOverrides: Partial<TokenBundle>;
  setTokenOverrides: (overrides: Partial<TokenBundle>) => void;
  compositionOverrides: Partial<CompositionConfig>;
  setCompositionOverrides: (overrides: Partial<CompositionConfig>) => void;
  surfaceOverrides: Partial<SurfaceConfig>;
  setSurfaceOverrides: (overrides: Partial<SurfaceConfig>) => void;
  // Resolved values (profile + overrides merged)
  resolvedSurface: SurfaceConfig;
  resolvedComposition: CompositionConfig;
}

const StyleContext = createContext<StyleContextValue | null>(null);

function loadStoredStyle(): StyleId {
  if (typeof window === 'undefined') return 'swiss';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored in styleProfiles) return stored as StyleId;
  } catch {
    // localStorage unavailable
  }
  return 'swiss';
}

export function StyleProvider({ children }: { children: ReactNode }) {
  const [activeStyle, setActiveStyleState] = useState<StyleId>(loadStoredStyle);
  const [tokenOverrides, setTokenOverrides] = useState<Partial<TokenBundle>>({});
  const [compositionOverrides, setCompositionOverrides] = useState<Partial<CompositionConfig>>({});
  const [surfaceOverrides, setSurfaceOverrides] = useState<Partial<SurfaceConfig>>({});

  const profile = getStyleProfile(activeStyle);

  const setActiveStyle = useCallback((id: StyleId) => {
    setActiveStyleState(id);
    // Reset overrides when switching styles
    setTokenOverrides({});
    setCompositionOverrides({});
    setSurfaceOverrides({});
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // localStorage unavailable
    }
  }, []);

  // Set data-style attribute on html element
  useEffect(() => {
    document.documentElement.setAttribute('data-style', activeStyle);
  }, [activeStyle]);

  const resolvedSurface: SurfaceConfig = {
    ...profile.surface,
    ...surfaceOverrides,
  };

  const resolvedComposition: CompositionConfig = {
    ...profile.composition,
    ...compositionOverrides,
  };

  return (
    <StyleContext.Provider
      value={{
        activeStyle,
        profile,
        setActiveStyle,
        tokenOverrides,
        setTokenOverrides,
        compositionOverrides,
        setCompositionOverrides,
        surfaceOverrides,
        setSurfaceOverrides,
        resolvedSurface,
        resolvedComposition,
      }}
    >
      {children}
    </StyleContext.Provider>
  );
}

export function useStyleContext(): StyleContextValue {
  const ctx = useContext(StyleContext);
  if (!ctx) {
    throw new Error('useStyleContext must be used within a StyleProvider');
  }
  return ctx;
}
