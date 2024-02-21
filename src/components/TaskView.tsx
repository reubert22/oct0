import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {Task} from '../models/Task';
import {useGlobalActorRef} from '../contexts/GlobalContext';
import {ACTION_TYPES, COLORS} from '../utils/constants';

export const TaskView = ({task}: {task: Task}) => {
  const {send} = useGlobalActorRef();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.togglBtn}
        onPress={() =>
          send({
            type: ACTION_TYPES.TOGGLE,
            data: task,
          })
        }>
        {task.completed ? (
          <AntDesign name="check" size={20} color="green" />
        ) : (
          <View style={styles.selectView} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.selectBtn}
        onPress={() => send({type: ACTION_TYPES.EDIT, data: task})}>
        <View style={styles.mainSection}>
          <Text style={styles.title}>{task.title}</Text>
          {!!task.description && (
            <Text style={styles.description}>{task.description}</Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() =>
          send({
            type: ACTION_TYPES.DELETE,
            data: task,
          })
        }>
        <FontAwesome name="trash" size={20} color={COLORS.lightBlue} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    padding: 4,
    marginHorizontal: 2,
    marginVertical: 5,
    backgroundColor: COLORS.white,
    flexDirection: 'row',

    shadowOffset: {width: -1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    shadowColor: COLORS.shadowBlack,
  },
  mainSection: {
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: 'Roboto-Bold',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  check: {
    fontSize: 24,
  },
  //
  togglBtn: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectView: {
    borderWidth: 1,
    width: 20,
    height: 20,
    borderRadius: 100,
    borderColor: COLORS.gray,
  },
  //
  deleteBtn: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //
  selectBtn: {flex: 1},
});
