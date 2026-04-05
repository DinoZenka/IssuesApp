import React, { memo } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { useAppTheme } from '@src/utils/theme';
import { SearchIcon } from '@src/assets/icons';

interface IProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

const SearchInput: React.FC<IProps> = ({ value, onChangeText, error }) => {
  const theme = useAppTheme();
  const { colors } = theme;

  const styles = createStyles(theme, !!error);

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
          <SearchIcon fill={colors.secondary} />
        </View>
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
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
