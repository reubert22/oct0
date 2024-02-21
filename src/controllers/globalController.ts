import {InterpreterFrom, MachineOptions, assign, createMachine} from 'xstate';
import Toast from 'react-native-toast-message';
import {NavigationProp} from '@react-navigation/native';

import {Task} from '../models/Task';
import {RootStackParamList} from '../navigation/Navigation';

export type GlobalService = InterpreterFrom<typeof globalController>;

type GlobalContext = {
  currentTasks: [Task];
  pendingTasks: [Task];
  completedTasks: [Task];
  currentTask?: Task;
  navigationController: NavigationProp<RootStackParamList>;
};

export type GlobalEvents =
  | {type: 'SHOW_EDITOR'}
  | {type: 'SAVE'; data: Partial<Task>}
  | {type: 'CANCEL'}
  | {type: 'EDIT'; data: Partial<Task>}
  | {type: 'TOGGLE'; data: Partial<Task>}
  | {type: 'DELETE'; data: Partial<Task>};

const actions: MachineOptions<GlobalContext, GlobalEvents>['actions'] = {
  openTaskEditor: (ctx, _) =>
    ctx.navigationController.navigate('TaskEditor' as any),
  deleteTask: assign((ctx, e) => {
    if (e.type !== 'DELETE') {
      return {};
    }

    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Task deleted ✅',
    });

    if (e.data.completed) {
      return {
        completedTasks: ctx.completedTasks.filter(
          task => task.id !== e.data.id,
        ) as [Task],
      } as any;
    }
    if (!e.data.completed) {
      return {
        pendingTasks: ctx.pendingTasks.filter(
          task => task.id !== e.data.id,
        ) as [Task],
      } as any;
    }

    return {};
  }),
  editTask: assign((ctx, e) => {
    if (e.type !== 'EDIT') {
      return {};
    }

    const currentTask = {
      ...(ctx.currentTask ?? {}),
      ...e.data,
    } as Task;

    ctx.navigationController.navigate('TaskEditor' as any);

    return {
      currentTask,
    };
  }),
  toggleTask: assign((ctx, e) => {
    if (e.type !== 'TOGGLE') {
      return {};
    }

    if (e.data.completed) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Task was moved to pending',
      });

      return {
        completedTasks: ctx.completedTasks.filter(
          task => task.id !== e.data.id,
        ) as [Task],
        pendingTasks: [...ctx.pendingTasks, {...e.data, completed: false}],
        currentTask: undefined,
      } as any;
    }

    if (!e.data.completed) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Task moved to complete ✅',
      });

      return {
        pendingTasks: ctx.pendingTasks.filter(
          task => task.id !== e.data.id,
        ) as [Task],
        completedTasks: [...ctx.completedTasks, {...e.data, completed: true}],
        currentTask: undefined,
      } as any;
    }

    return {};
  }),
  saveNewTask: assign((ctx, e) => {
    if (e.type !== 'SAVE') {
      return {};
    }

    // New todo items
    if (!e.data.id && !ctx.currentTask) {
      const newTask: Task = {
        id: (Math.random() * e.data.title!.length * 100).toString(),
        title: e.data.title ?? '',
        description: e.data.description ?? '',
        completed: false,
      };

      const updatedTasks = [...ctx.pendingTasks, newTask];

      ctx.navigationController.canGoBack() && ctx.navigationController.goBack();

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'New task created ✅',
      });

      return {
        pendingTasks: updatedTasks as [Task],
        currentTask: undefined,
      };
    }

    // Edit completed items
    if (e.data.completed) {
      const newCompletedList = ctx.completedTasks.map(task => {
        if (task.id === e.data.id) {
          return {
            ...task,
            title: e.data.title ?? '',
            description: e.data.description ?? '',
          };
        }
        return task;
      });

      ctx.navigationController.canGoBack() && ctx.navigationController.goBack();

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Task edited ✅',
      });

      return {
        completedTasks: newCompletedList as [Task],
        currentTask: undefined,
      };
    }

    // Edit pending items
    if (!e.data.completed) {
      const newPendingList = ctx.pendingTasks.map(task => {
        if (task.id === e.data.id) {
          return {
            ...task,
            title: e.data.title ?? '',
            description: e.data.description ?? '',
          };
        }
        return task;
      });

      ctx.navigationController.canGoBack() && ctx.navigationController.goBack();

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Task edited ✅',
      });

      return {
        pendingTasks: newPendingList as [Task],
        currentTask: undefined,
      };
    }

    return {};
  }),
  dismissTaskEditor: assign((ctx, _) => {
    ctx.navigationController.canGoBack() && ctx.navigationController.goBack();
    return {
      currentTask: undefined,
    };
  }),
};

export const globalController = createMachine(
  {
    schema: {
      context: {} as GlobalContext,
      events: {} as GlobalEvents,
    },
    predictableActionArguments: true,
    initial: 'idle',
    states: {
      idle: {
        on: {
          SHOW_EDITOR: {
            target: 'editing',
            actions: 'openTaskEditor',
          },
          EDIT: {
            target: 'editing',
            actions: 'editTask',
          },
          TOGGLE: {
            actions: 'toggleTask',
          },
          DELETE: {
            actions: 'deleteTask',
          },
        },
      },
      editing: {
        on: {
          SAVE: {
            actions: 'saveNewTask',
            target: 'idle',
          },
          CANCEL: {
            target: 'idle',
            actions: 'dismissTaskEditor',
          },
        },
      },
    },
  },
  {
    actions,
  },
);
