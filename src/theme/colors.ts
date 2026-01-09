import { Shadows } from "@type/colors";

export const colors = {
  primary: '#6567f1',
  background: '#f6f6f8',
  backgroundDark: '#111122',
  white: '#ffffff',

  textMain: '#0e0e1b',
  textMuted: '#6b7280',

  // Priority colors
  priorityHigh: '#ef4444',
  priorityHighBg: '#fef2f2',
  priorityMedium: '#fb923c',
  priorityMediumBg: '#fff7ed',
  priorityLow: '#9ca3af',
  priorityLowBg: '#f3f4f6',

  // Status colors
  success: '#22c55e',
  successLight: '#dcfce7',
  notification: '#ef4444',

  // Card & UI
  cardBg: '#ffffff',
  border: '#e5e7eb',
  borderLight: '#f3f4f6',
  shadow: 'rgba(0, 0, 0, 0.05)',

  // Gray scale
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray800: '#1f2937',
};

export const shadows: Shadows = {
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
};
