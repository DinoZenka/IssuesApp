import { PageSearchIcon } from '@src/assets/icons';
import { useAppTheme, useThemedStyles } from '@src/utils/theme';
import { StyleSheet, Text, View } from 'react-native';

const DetailsNotFound = () => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <PageSearchIcon />
      <Text style={styles.errorText}>Failed to load issue details.</Text>
    </View>
  );
};

const createStyles = (theme: ReturnType<typeof useAppTheme>) => {
  const { colors, spacing, typography } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.lg,
      gap: spacing.lg,
    },
    errorText: {
      ...typography.variants.subtitle2,
      color: colors.dark80,
    },
  });
};

export default DetailsNotFound;
