import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, Text, Pressable} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import {useGlobalActorRef, useGlobalSelector} from '../contexts/GlobalContext';
import {ACTION_TYPES, COLORS} from '../utils/constants';

const AddNewTaskValidation = yup.object({
  title: yup
    .string()
    .required('Required field')
    .max(40, 'Max of 40 characters'),
});

export const TaskEditor = () => {
  const {send} = useGlobalActorRef();
  const currentTask = useGlobalSelector(state => state.context.currentTask);
  const [description, setDescription] = useState<string>(
    currentTask?.description ?? '',
  );

  const {
    control,
    formState: {errors},
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(AddNewTaskValidation),
    defaultValues: {
      title: currentTask?.title ?? '',
    },
  });

  useEffect(() => {
    return () => send(ACTION_TYPES.CANCEL);
  }, [send]);

  const title = watch('title');

  const handleSave = () =>
    send({
      type: ACTION_TYPES.SAVE,
      data: !!currentTask
        ? {...currentTask, title, description}
        : {title, description},
    });
  const handleCancel = () => send(ACTION_TYPES.CANCEL);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="title"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            style={styles.textInput}
            onChangeText={onChange}
            value={value}
            placeholder="Title"
            keyboardType="default"
          />
        )}
      />
      {errors.title && (
        <Text style={styles.errorText}>{errors.title.message}</Text>
      )}
      <TextInput
        style={[styles.textInput, styles.description]}
        multiline
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <View>
        <Pressable style={styles.saveBtn} onPress={handleSubmit(handleSave)}>
          <Text style={styles.btnText}>Save</Text>
        </Pressable>
        <Pressable style={styles.cancelBtn} onPress={handleCancel}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 8,
    height: '75%',
    padding: 4,
  },
  textInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    padding: 2,
    borderRadius: 4,
    height: 30,
    paddingHorizontal: 4,
  },
  description: {
    height: 100,
  },
  errorText: {
    width: '100%',
    fontSize: 12,
    color: COLORS.redDanger,
    marginBottom: 5,
  },
  //
  saveBtn: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: 4,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  btnText: {
    fontSize: 16,
    color: COLORS.white,
    fontFamily: 'Roboto-Regular',
  },
  cancelBtn: {
    borderColor: COLORS.lightBlue,
    borderWidth: 1,
    borderRadius: 4,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cancelBtnText: {
    fontSize: 16,
    color: COLORS.lightBlue,
    fontFamily: 'Roboto-Regular',
  },
});
