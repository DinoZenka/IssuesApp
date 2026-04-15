import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useAppTheme, useThemedStyles } from '@src/utils/theme';
import { CrossIcon, SearchIcon } from '@src/assets/icons';
import Shimmer from '@src/components/Shimmer';
import { useFocus } from '@src/hooks/useFocus';

interface IProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

const SearchInput: React.FC<IProps> = ({ value, onChangeText, error }) => {
  const theme = useAppTheme();
  const { isFocused, focusHandlers } = useFocus();

  const { colors } = theme;

  const styles = useThemedStyles(createStyles);

  const handleClearInput = () => onChangeText('');

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputFocused,
          !!error && styles.inputError,
        ]}
      >
        <TextInput
          {...focusHandlers}
          style={styles.input}
          placeholder="Search for"
          placeholderTextColor={colors.dark80}
          value={value}
          onChangeText={onChangeText}
          accessible={true}
          accessibilityLabel="Search issues by title"
        />
        <View style={styles.iconWrapper}>
          {value ? (
            <TouchableOpacity
              onPress={handleClearInput}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Clear search input"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <CrossIcon />
            </TouchableOpacity>
          ) : (
            <SearchIcon fill={colors.secondary} />
          )}
        </View>
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export const SearchInputSkeleton = () => {
  const theme = useAppTheme();
  const { colors } = theme;

  const styles = createStyles(theme);

  return (
    <View
      style={styles.container}
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <View style={[styles.inputWrapper, styles.skeletonInputWrapper]}>
        <Shimmer width="85%" />
        <View style={styles.iconWrapper}>
          <SearchIcon stroke={colors.dark} />
        </View>
      </View>
      <Shimmer width="100%" height={12} style={styles.errorText} />
    </View>
  );
};

const createStyles = (theme: ReturnType<typeof useAppTheme>) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    container: {
      marginBottom: spacing.xs,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: spacing.lg,
      height: 48,
    },
    inputFocused: {
      borderColor: colors.primary,
    },
    inputError: {
      borderColor: colors.danger,
    },
    skeletonInputWrapper: {
      backgroundColor: colors.card,
      justifyContent: 'space-between',
    },
    input: {
      ...typography.variants.bodyLight,
      color: colors.dark,
      flex: 1,
      paddingVertical: 0,
      lineHeight: undefined,
      textAlignVertical: 'center',
    },
    iconWrapper: {
      marginLeft: spacing.sm,
    },
    errorText: {
      ...typography.variants.bodyLight,
      color: colors.danger,
      marginTop: spacing.sm,
    },
  });
};

export default SearchInput;
