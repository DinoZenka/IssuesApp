import { useMemo } from 'react';
import { useColorScheme } from 'react-native';

const palette = {
  primary: '#5850EC',
  danger: '#FF2929',
  warning: '#ffc107',
  info: '#17a2b8',
  border: '#D1D5DB',

  black: '#313131',
  white: '#ffffff',
  grey100: '#f8f9fa',
  grey200: '#eeeeee',
  grey300: '#dee2e6',
  grey400: '#EAEAEA',
  grey600: '#F6F6F6',
  grey800: '#6F6F6F',
  grey900: '#333333',
  greyMuted: '#999999',

  purple: '#4841D2',
  purple600: '#5850EC',
  purple800: '#5850EC',

  black800: '#6F6F6F',

  green: '#267B37',
  green800: '#29AD2C',

  orange: '#B84100',
};

export const lightColors = {
  primary: palette.primary,
  secondary: palette.grey600,
  success: palette.green,
  danger: palette.danger,
  background: '#f5f5f5',
  card: palette.white,
  text: palette.grey900,
  textSecondary: palette.grey600,
  textMuted: palette.greyMuted,
  border: palette.border,
  shadow: palette.black,
  green80: palette.green800,
  purple60: palette.purple600,
  purple80: palette.purple800,
  dark: palette.black,
  dark80: palette.grey800,
  dark40: palette.grey400,
  orange: palette.orange,
};

export const darkColors: typeof lightColors = {
  primary: '#3395ff',
  secondary: palette.grey300,
  success: palette.green,
  danger: '#ff5c5c',
  background: '#121212',
  card: '#1e1e1e',
  text: '#f5f5f5',
  textSecondary: palette.grey300,
  textMuted: palette.grey600,
  border: '#333333',
  shadow: palette.black,
  green80: palette.green800,
  purple60: palette.purple600,
  purple80: palette.purple800,
  dark: palette.black,
  dark80: palette.grey800,
  dark40: palette.grey400,
  orange: palette.orange,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

const fonts = { regular: 'Outfit-Regular', light: 'Outfit-Light' } as const;

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },
  fonts,
  variants: {
    display1: {
      fontFamily: fonts.regular,
      fontSize: 40,
      fontWeight: '400' as const,
    },
    header1: {
      fontFamily: fonts.regular,
      fontSize: 32,
      fontWeight: '400' as const,
    },
    header2: {
      fontFamily: fonts.regular,
      fontSize: 24,
      fontWeight: '400' as const,
    },
    subtitle1: {
      fontFamily: fonts.regular,
      fontSize: 20,
      fontWeight: '400' as const,
    },
    subtitle2: {
      fontFamily: fonts.regular,
      fontSize: 16,
      fontWeight: '400' as const,
    },
    bodyRegular: {
      fontFamily: fonts.regular,
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 14 * 1.4,
    },
    bodyLight: {
      fontFamily: fonts.light,
      fontSize: 14,
      fontWeight: '300' as const,
      lineHeight: 14 * 1.4,
    },
    body2: {
      fontFamily: fonts.regular,
      fontSize: 13,
      fontWeight: '400' as const,
      lineHeight: 13 * 1.4,
    },
    bodyTab: {
      fontFamily: fonts.regular,
      fontSize: 13,
      fontWeight: '300' as const,
    },
  },
};

export const shadow = {
  sm: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
};

export const useAppTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return useMemo(() => {
    const colors = isDark ? darkColors : lightColors;

    return {
      colors,
      spacing,
      typography,
      shadow,
      isDark,
    };
  }, [isDark]);
};

export const useThemedStyles = <T>(styleFactory: (theme: AppTheme) => T) => {
  const theme = useAppTheme();
  return useMemo(() => styleFactory(theme), [theme, styleFactory]);
};

export type AppTheme = ReturnType<typeof useAppTheme>;
