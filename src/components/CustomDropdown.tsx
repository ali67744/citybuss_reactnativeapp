import React, {memo} from 'react';
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
const CustomDropdown = ({title,style,text,required,tempdata,label, onSelect,type=1,sortingTrue=true}) => {
const[filterModal,setfilterModal]=React.useState(false);
const[data,setData]=React.useState(tempdata);


const [searchValue, setSearchVal] = React.useState('');

const searchFilterFunction = (text) => {
  // Check if searched text is not blank
  if (text) {
    const newData = tempdata.filter(
      function (item) {
        var itemData;
        if(type==2){
          itemData   = item
          ? item.StationName.toUpperCase()
          : ''.toUpperCase();
        }else{
          itemData = item
          ? item.toUpperCase()
          : ''.toUpperCase();
        }
       
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
    });
    setData(newData);
    // setSearch(text);
  } else {
    setData(tempdata);
    // setSearch(text);
  }
};
const _closehandler = 
  ()=>{setSearchVal('') 
  setData(tempdata);}

  return (<View style={style}>
    
<TextView style={styles.h1} text={title}/>
   <View style={[styles.textInput,]}>

      <Pressable
      onPress={()=>{
        setData([...tempdata])
        setfilterModal(true)
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
      }} text={label} />
      <MaterialIcons name="arrow-drop-down"  
         color={'#000'} size={26}></MaterialIcons>
      </Pressable>
      </View>
   { filterModal && (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={filterModal}
        onRequestClose={() => {
          setfilterModal(false);
          //console.log('Modal has been closed.');
        }}>
        <View style={styles.modal}>
        
        
          <View style={{width:'100%', flexDirection: 'column', alignItems: 'center' }}>
          <Pressable 
            onPress={()=>{setfilterModal(false)}}
            style={{alignSelf:'flex-end',marginTop:60}}>
              <MaterialIcons
              name={'close'}
              style={{color:Colors.red}}
              size={26}
              ></MaterialIcons>
            </Pressable>
            <Card style={styles.modalcardall}>
              <View style={{ padding: 10 }}>
               {/* //your content */}
               {/* <TextView text="hello"></TextView> */}
              <View style={{flexDirection:'row',alignItems:'center', 
              borderBottomWidth:0.7, borderBottomColor:Colors.darkGreenColor,
              marginBottom:30,
              width:'85%', alignSelf:'center'}}>
                <View style={{flex:1}}>
                  <TextInput 
                  value={searchValue}
                  onChangeText={(value)=>{
                    setSearchVal(value)
                    // //console.log(searchValue);/
                    searchFilterFunction(value);
                  }}
                  placeholder={'Search..'}
                  placeholderTextColor={'#cdcdcd'}
                  style={{color:'#7d7d7d',height:40}} />
                </View>
                <View style={{ paddingTop:0, marginTop:0}}>
                <Pressable style={styles.circle}
                onPress={_closehandler}
                >
      <MaterialIcons name="close" 
      style={{alignSelf: 'center'}}
      color={Colors.parrotGreenColor} size={14} />
      

      </Pressable>
                </View>
              </View>
               <FlatList
               style={{height:height/1.5}}
        data={sortingTrue==false?data:data.sort((a, b) => type==2? a.StationName.localeCompare(b.StationName) : a.localeCompare(b) )}
        renderItem={({ item, index, separators }) => {
        return <Pressable 
            style={{padding:12, borderBottomColor:'#f0f5f1', borderBottomWidth:1}}
            onPress = {()=>{
              setfilterModal(false)
              var matchedIndex = tempdata.map(function (obj) { return type==2?obj.StationName:obj }).indexOf(type==2?item.StationName:item);

              onSelect(item, matchedIndex )}}
            >
                <TextView text={type==2?item.StationName:item} style={{color:'#000'}}/>
            </Pressable>
        }}
      />
              </View>
            </Card>
            
 
        
          </View>
        </View>
      </Modal>
    )}
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

 
  textInput:{paddingLeft:0,marginTop:15,marginBottom:3,height:60,
    backgroundColor:Colors.white,padding:10,borderRadius:10,elevation:1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,

  flexDirection:'row',alignItems:'center',
  alignSelf:'center',
  },
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

export default memo(CustomDropdown);
