import { createContext } from 'react';

interface SnackbarContextProps {
  showMessage: (message: string, severity?: 'success' | 'error' | 'warning' | 'info') => void;
}

export const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);