import React from 'react';
import {FlatList} from 'react-native';
import {useGlobalSelector} from '../contexts/GlobalContext';
import {TaskView} from '../components/TaskView';
import {COLORS} from '../utils/constants';
import {ListShellContainer} from '../components/ListShellContainer';

export const History = () => {
  const completedTasks = useGlobalSelector(
    state => state.context.completedTasks,
  );

  return (
    <ListShellContainer title="Completed Tasks">
      <FlatList
        data={completedTasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => <TaskView task={item} />}
        style={{backgroundColor: COLORS.white}}
      />
    </ListShellContainer>
  );
};
