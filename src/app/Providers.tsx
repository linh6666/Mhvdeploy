'use client';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ReactNode } from 'react';
import { AuthProvider } from './hooks/AuthProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MantineProvider>
      <Notifications position="top-right" />
      <AuthProvider>{children}</AuthProvider>
    </MantineProvider>
  );
}
