import React from 'react';
import {View, StyleSheet} from 'react-native';
import Colors from '../theme/Colors';
import TextView from './TextView';
const RadioButton = ({active, text}) => {
  return (
    <View style={styles.viewRow}>
      <View
        style={[
          {backgroundColor: active ? Colors.primary : Colors.white},
          styles.viewCircle,
        ]}></View>
      <TextView text={text} style={styles.txt} />
    </View>
  );
};
export default RadioButton;
const styles = StyleSheet.create({
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt:{color:Colors.primary},
  viewCircle: {
    height: 30,
    width: 30,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: 'center',
    
  },
});
