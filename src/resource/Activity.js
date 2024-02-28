import React, {useContext} from 'react';
import {Modal, StyleSheet, View, ActivityIndicator} from 'react-native';
import {AppContext} from '../context/AppContext';
import {APPS_COLOR} from '../lib/const';

const Activity = () => {
  const {loading} = useContext(AppContext);
  return (
    <Modal
      statusBarTranslucent
      animated={false}
      transparent={true}
      visible={loading.is_loading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" color={APPS_COLOR} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 200,
    width: 200,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Activity;
