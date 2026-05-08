import { StateCreator } from 'zustand';
import { AppState } from '../index';

export interface UISlice {
  isSidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const createUISlice: StateCreator<
  AppState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  UISlice
> = (set) => ({
  isSidebarOpen: false,
  theme: 'system',
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen }), false, 'ui/toggleSidebar'),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }, false, 'ui/setSidebarOpen'),
  setTheme: (theme) => set({ theme }, false, 'ui/setTheme'),
});
