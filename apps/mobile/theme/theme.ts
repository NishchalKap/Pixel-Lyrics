/**
 * pixel-lyrics Design System
 * Centralized theme for the entire application
 */

// ─── Colors ──────────────────────────────────────────────
export const colors = {
  primary: '#7A5A2B',
  accent: '#C6A66A',
  background: '#FAF7F2',
  card: '#FFFFFF',
  textPrimary: '#1A1A1A',
  textSecondary: '#6A6A6A',
  divider: '#EAE4D8',
  success: '#27AE60',
  error: '#E74C3C',
  warning: '#D4A017',
  white: '#FFFFFF',
  // Transparent variants
  primary10: 'rgba(122,90,43,0.1)',
  primary20: 'rgba(122,90,43,0.2)',
  accent15: 'rgba(198,166,106,0.15)',
};

// ─── Spacing ─────────────────────────────────────────────
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// ─── Border Radius ───────────────────────────────────────
export const radius = {
  small: 10,
  medium: 16,
  large: 24,
  full: 999,
};

// ─── Typography ──────────────────────────────────────────
export const typography = {
  hero: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600' as const,
    color: '#1A1A1A',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#1A1A1A',
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    color: '#1A1A1A',
    lineHeight: 22,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    color: '#6A6A6A',
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
};

// ─── Shadows ─────────────────────────────────────────────
export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 6,
  },
};

// ─── Theme Object ────────────────────────────────────────
const theme = {
  colors,
  spacing,
  radius,
  typography,
  shadows,
};

export default theme;
