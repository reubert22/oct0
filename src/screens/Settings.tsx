import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useGlobalSelector} from '../contexts/GlobalContext';
import {COLORS} from '../utils/constants';
import {ListShellContainer} from '../components/ListShellContainer';

export const Settings = () => {
  const completedTasks = useGlobalSelector(
    state => state.context.completedTasks,
  );
  const pendingTasks = useGlobalSelector(state => state.context.pendingTasks);

  return (
    <ListShellContainer title="Settings">
      <>
        <View style={styles.profileContainer}>
          <View style={styles.profilePicture} />
          <Text style={styles.profileName}>Example Name</Text>
          <Text style={styles.profileEmail}>emailexample@gmail.com</Text>
          <Pressable style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </Pressable>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>Tasks</Text>
          <Text style={styles.infoText}>
            Number of tasks: {pendingTasks.length + completedTasks.length}
          </Text>
          <Text style={styles.infoText}>
            Quantity of completed tasks: {completedTasks.length}
          </Text>
          <Text style={styles.infoText}>
            Quantity of pending tasks: {pendingTasks.length}
          </Text>
        </View>
        {/* <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>Preferences</Text>
        </View> */}
      </>
    </ListShellContainer>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    padding: 16,
    alignItems: 'center',
  },
  profilePicture: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lightGray,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontFamily: 'Roboto-Regular',
    color: COLORS.black,
    marginBottom: 10,
  },
  profileEmail: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: COLORS.gray,
    marginBottom: 10,
  },
  editBtn: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: 4,
    height: 45,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  editBtnText: {
    fontSize: 16,
    color: COLORS.white,
    fontFamily: 'Roboto-Regular',
  },
  infoContainer: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Roboto-Regular',
    color: COLORS.gray,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: COLORS.black,
    marginBottom: 3,
  },
});
