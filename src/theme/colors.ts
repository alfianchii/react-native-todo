import type { Colors, Shadows } from '@type/colors'

export const colors: Colors = {
  primary: '#6567f1',
  primaryLight: 'rgba(101, 103, 241, 0.1)',

  background: '#f6f6f8',
  backgroundDark: '#111122',
  white: '#ffffff',
  black: '#000000',

  textMain: '#0e0e1b',
  textMuted: '#6b7280',

  priorityHigh: '#ef4444',
  priorityHighBg: '#fee2e2',
  priorityMedium: '#f59e0b',
  priorityMediumBg: '#fef3c7',
  priorityLow: '#16a34a',
  priorityLowBg: '#dcfce7',

  categoryWork: '#9333ea',
  categoryWorkBg: '#f3e8ff',
  categoryPersonal: '#059669',
  categoryPersonalBg: '#d1fae5',
  categoryInbox: '#2563eb',
  categoryInboxBg: '#dbeafe',
  categoryCollege: '#0891b2',
  categoryCollegeBg: '#cffafe',

  datePink: '#db2777',
  datePinkBg: '#fce7f3',

  success: '#22c55e',
  successLight: '#dcfce7',
  error: '#ef4444',
  warning: '#f59e0b',
  notification: '#ef4444',

  cardBg: '#ffffff',
  border: '#e5e7eb',
  borderLight: '#f3f4f6',
  shadow: 'rgba(0, 0, 0, 0.05)',
  overlay: 'rgba(17, 24, 39, 0.5)',
  overlayLight: 'rgba(107, 114, 128, 0.1)',

  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
};

export const shadows: Shadows = {
  soft: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  card: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
};
