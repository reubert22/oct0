import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {COLORS} from '../../utils/constants';

export const ListShellContainer = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <View style={styles.container}>
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  headerContainer: {
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Roboto-Regular',
    color: COLORS.black,
  },
});
