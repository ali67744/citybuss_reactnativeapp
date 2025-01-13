import React, {memo, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Platform,
  Modal,
  StyleSheet,
  Alert,
  Pressable,
  FlatList,
  TextInput
} from 'react-native';
import { TouchableOpacity,TouchableWithoutFeedback} from 'react-native-gesture-handler'
import {connect, useSelector} from 'react-redux';
import { Card } from 'react-native-paper';
const {height, width} = Dimensions.get('window');
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TextView from './TextView';
import Colors from '../theme/Colors';
import log from '../utils/logs';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
const CustomDateTimepicker = ({title,style,required,defaultValue,onChange,mode='datetime'}) => {

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)


  return (<View style={style}>
    
<TextView style={styles.h1} text={title}/>
   <View style={[styles.textInput,]}>

      <Pressable
      onPress={()=>{
        setOpen(true);
      }}
      style={[styles.dropdownstyles,{flexDirection:'row',alignItems:'center'}]}
      >
    <TextView  style={{
      flex:1, 
      backgroundColor:'#FFF',
      color:Colors.light_grey,
      //height:55,
      paddingLeft:0,marginTop:5,
      fontSize: 20,
      flexDirection:'row',
      alignItems:'center',
      width:width/2.5,borderRadius:3
      }} text={defaultValue} />
      <MaterialIcons name="arrow-drop-down"  
         color={'#000'} size={26}></MaterialIcons>
      </Pressable>
      </View>
      {/* <DatePicker
        modal
        mode={mode}
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          onChange(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      /> */}
      {open && <DateTimePicker
          value={date}
          mode={mode}
          display="default" // or "spinner", "calendar", etc.
          onChange={(v)=>{
            log("===>v",v?.nativeEvent?.timestamp)
            setOpen(false)
            // setDate(moment(v?.nativeEvent?.timestamp))
            onChange(v?.nativeEvent?.timestamp)
          }}
        />}
  </View>
   

  );
};
const styles = StyleSheet.create({
  shareview: { flexDirection: 'row', alignItems: 'center', margin: 5 },
  modalcardtopright: {
    borderRadius: 20,
    height: height / 10,
    width: width / 2,
    alignSelf:'center',
    elevation: 20,
  },
  dropdownstyles:{marginLeft:20,flex:1},
  modalcardall: {
    borderRadius: 20,
    marginTop:20,
    height: height / 1.3,
    width: width / 1.3,
    elevation: 20,
    backgroundColor:'#FFFFFF',
  },
  h1: { fontSize: 18, color: '#000',marginTop:0  },
  text1: { fontSize: 14, color: '#8E8E93',  },
  text2: { fontSize: 20, color: '#000', },
  flexrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    position: 'absolute',
  },
  circle: {height:20,width:20,borderRadius:100,marginLeft:0,marginRight:10,
    justifyContent:'center',backgroundColor:'#f1f1f1'},
  name: {
    fontSize: 14,
  },
  name2: {
    fontSize: 24,
  },
  editext: { marginTop: 80, marginLeft: 20 },

  textInput:{paddingLeft:0,marginTop:10,marginBottom:33,height:60,
    backgroundColor:Colors.white,padding:10,borderRadius:10,elevation:1,
  flexDirection:'row',alignItems:'center',
  alignSelf:'center',
  width:width/1.1},
  alltext: {
    marginRight: 10,
 fontSize: 14,
  },
  historytext: {
    fontSize: 18,
  },
  historyblock: {
    justifyContent: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#F8F8F9',
    borderRadius: 30,
    width: Dimensions.get('screen').width,
  },

  modal: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default memo(CustomDateTimepicker);
