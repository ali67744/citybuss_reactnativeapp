import React from 'react'
import { Snackbar } from 'react-native-paper'
import { StyleSheet, View, Text } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import  Colors  from '../theme/Colors'
//import { theme } from '../core/theme'
export default function Toast({ type = 'error', message, onDismiss }) {
  return (
    <View style={styles.container}>
      <Snackbar
        visible={!!message}
        duration={3000}
        //onDismiss={onDismiss}
        action={{
          labelStyle:{color:'#FFF'},
          label: 'close',
          onPress: () => {
            // Do something
            onDismiss
          },
        }}
        style={{
          backgroundColor:
            type === 'error' ? Colors.red: Colors.green,
        }}
      >
        <Text style={styles.content}>{message}</Text>
      </Snackbar>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60 + getStatusBarHeight(),
    width: '100%',
  },
  content: {
    fontWeight: '500',
  },
})