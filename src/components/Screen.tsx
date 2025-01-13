import React, {memo, useRef} from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView,TouchableOpacity, ScrollView, Platform} from 'react-native';

import Colors from '../theme/Colors';
const {height, width} = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomProgressDialog from './CustomProgressDialoge';
import Toast from './Toast';
import TextView from './TextView';
import AppStatusBar from './AppStatusBar';
import { TextInput } from 'react-native';
const Screen = ({
  children,
  title,
  modalizeRef,
  modalize = false,
  toastType,
  toastMessage,
  header = true,
  progresstitle,
  progressVisible,
  setProgressvisible,
  progressDilaog = false,
  backButton=true,
  scroll=false,
  searchbar=false,
  onSearch,
  SearchPlaceHolder='Search...'
}) => {
    const navigation=useNavigation()
  return (
    <View style={styles.container}>
      <AppStatusBar />
      <View style={styles.container}>
        {header && (
          <View style={styles.topHeader}>
           {backButton ?  <TouchableOpacity
            style={{flex:1,marginLeft:30, marginTop:Platform.OS=='ios'?40: 10,}}
            activeOpacity={0.7}
            onPress={()=>{navigation.canGoBack()?navigation.goBack():null}}
            >
            <MaterialIcons 
            size={30}
            name="keyboard-backspace" color={Colors.white} />
</TouchableOpacity>:<View style={{flex:1}}></View>}
            <TextView
              style={{
                flex:1,
                fontSize: Platform.OS=='ios'? 20:30,
                color: Colors.white,
                // alignSelf: 'center',
                // textAlign: 'center',
                marginTop:Platform.OS=='ios'?40: 20,
                // marginRight: 20,
              }}
              text={title}></TextView>
              <View style={{flex:1}}></View>
          </View>
        )}
        {searchbar && <View style={styles.searchbar}>
          <MaterialIcons name='search' size={20}/>
          <TextInput placeholder={SearchPlaceHolder} style={{flex:1,marginHorizontal:10}} onChangeText={onSearch}/>
        </View>}
        {scroll ? <ScrollView>
          {children}
          </ScrollView>:children}
        
      </View>
      <Toast type={toastType} message={toastMessage} />

      {progressDilaog && (
        <CustomProgressDialog
          dialogVisible={progressVisible}
          setDialogVisible={setProgressvisible}
          text={progresstitle}
        />
      )}
    </View>
  );
};
export default memo(Screen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    height:Platform.OS=='ios'? 100: height / 12,
    backgroundColor: Colors.primary,
  },
  backButton: {marginTop: 20, marginLeft: 20},
  searchbar:{flexDirection:'row',alignItems:'center',marginHorizontal:20,
    backgroundColor:Colors.white,elevation:1,borderRadius:10,paddingHorizontal:10,
    paddingVertical:10,marginTop:10
  }
});
