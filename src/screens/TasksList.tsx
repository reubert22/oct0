import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useGlobalSelector} from '../contexts/GlobalContext';
import {TaskView} from '../components/TaskView';
import {COLORS} from '../utils/constants';
import {ListShellContainer} from '../components/ListShellContainer';
import {EmptyList} from '../components/EmptyList';

export const TasksList = () => {
  const pendingTasks = useGlobalSelector(state => state.context.pendingTasks);

  return (
    <ListShellContainer title="Pending Tasks">
      <FlatList
        data={pendingTasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => <TaskView task={item} />}
        style={{backgroundColor: COLORS.white}}
        ListEmptyComponent={<EmptyList />}
      />
    </ListShellContainer>
  );
};
