import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {COLORS} from '../../utils/constants';

export const EmptyList = () => (
  <View style={styles.container}>
    <MaterialCommunityIcons name="sleep" size={50} color={COLORS.lightBlue} />
    <View>
      <Text style={styles.title}>Ooops! It's Empty</Text>
      <Text style={styles.description}>
        Looks like you don't have anything in your list
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Roboto-Regular',
    color: COLORS.black,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Roboto-Regular',
    color: COLORS.gray,
  },
});
