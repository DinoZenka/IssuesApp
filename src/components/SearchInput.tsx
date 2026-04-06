import React, { memo } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useAppTheme } from '@src/utils/theme';
import { CrossIcon, SearchIcon } from '@src/assets/icons';
import Shimmer from './Shimmer';

interface IProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

const SearchInput: React.FC<IProps> = ({ value, onChangeText, error }) => {
  const theme = useAppTheme();
  const { colors } = theme;

  const styles = createStyles(theme, !!error);
  const handleClearInput = () => onChangeText('');

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
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

  const styles = createStyles(theme, false);

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

const createStyles = (
  theme: ReturnType<typeof useAppTheme>,
  hasError: boolean,
) => {
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
      borderColor: hasError ? colors.danger : colors.border,
      paddingHorizontal: spacing.lg,
      height: 48,
    },
    skeletonInputWrapper: {
      backgroundColor: colors.card,
      justifyContent: 'space-between',
    },
    input: {
      ...typography.variants.bodyLight,
      color: colors.dark,
      flex: 1,
      height: '100%',
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

export default memo(SearchInput);
