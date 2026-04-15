import { PageSearchIcon } from '@src/assets/icons';
import { useAppTheme, useThemedStyles } from '@src/utils/theme';
import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IProps {
  title: string;
  description: string;
}

const ListEmpty: FC<IProps> = ({ title, description }) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.emptyContainer}>
      <PageSearchIcon />
      <Text style={styles.emptyTextTitle}>{title}</Text>
      <Text style={styles.emptyTextDescription}>{description}</Text>
    </View>
  );
};

const createStyles = (theme: ReturnType<typeof useAppTheme>) => {
  const { colors, typography, spacing } = theme;

  return StyleSheet.create({
    listContent: {
      flexGrow: 1,
      backgroundColor: colors.card,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyTextTitle: {
      ...typography.variants.subtitle1,
      color: colors.dark,
      marginTop: spacing.md,
      marginBottom: spacing.xs,
    },
    emptyTextDescription: {
      ...typography.variants.body2,
      color: colors.dark80,
      textAlign: 'center',
    },
  });
};

export default ListEmpty;
