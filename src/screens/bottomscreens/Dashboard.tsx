import React, { useState } from 'react';
import { View ,StyleSheet, Dimensions, FlatList, TouchableOpacity, Alert} from 'react-native';
import Screen from '../../components/Screen';
import TextView from '../../components/TextView';
const DEVICE_WIDTH = Dimensions.get('window').width;
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../theme/Colors';
import {connect, useDispatch, useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Dashboard=()=>{
    const userData = useSelector(state => state.UserDataReducer);
    const navigation=useNavigation()
    const [options,setOptions]=useState([
        {
            id:1,
            name:'Booking',
            icon:'library-books'
        },
        {
            id:2,
            name:'Luggage',
            icon:'luggage'
        },
        {
            id:3,
            name:'Customer Summary',
            icon:'collections-bookmark'
        },
        {
            id:4,
            name:'Old Tickets',
            icon:'data-thresholding'
        },
        {
            id:5,
            name:'Logout',
            icon:'exit-outline'
        }
        ,
        {
            id:6,
            name:'Send Parcel',
            icon:'cash-outline'
        }
    ])
    const dispatcher = useDispatch();
console.log("user", userData?.UserData)

const handleNavigation=(id)=>{

    switch(id)
    {
        case  1:{
            navigation.navigate('BookingList',{params:id})
            break;
        }
        case  2:{
            navigation.navigate('BookingList',{params:id})
            break;
        }
        case  3:{
            
            navigation.navigate('CustomerSummaryList',{params:id})
            break;
        }
        case  4:{
            navigation.navigate('OldTickets',{params:id})
    
            break;
        }
        case  5:{
            Alert.alert("Logout","Do you want to log out?",[{"text":'Yes',onPress:()=>{
                AsyncStorage.setItem("@userData", "null");
                dispatcher({
                  type: 'UserData',
                  payload: null,
                });
                navigation.replace('LoginScreen');
            }},{"text":'No'}])
           
            break;
        }
        case  6:{
            
            navigation.navigate('SendParcel',{params:id})
            break;
        }
    }
}
    const renderItem = ({ item }) => {

      return <TouchableOpacity onPress={()=>{
        handleNavigation(item?.id)
        }}
         style={styles.item}>
           {item?.id==6|| item?.id==5?
           <Ionicons size={50} color={Colors.primary} name={item?.icon}/>

           :
           <MaterialIcons size={50} color={Colors.primary} name={item?.icon}/>
           }
          <TextView style={styles.h1} text={item?.name}/>
        </TouchableOpacity>
    };
return <Screen
backButton={false}
searchbar={false}
title={"Dashboard"}

>
    <View style={{flexDirection:'row',alignItems:'center',marginTop:20,marginHorizontal:10}}>
        <View style={styles.circle}>
            <MaterialIcons name='person' size={30} color={Colors.primary}/>
        </View>
        <View>
            <TextView style={styles.h2} text={"Welcome!"}/>
            <TextView style={styles.h3} text={userData?.UserData?.full_name}/>
        </View>
    </View>
<FlatList
      data={options}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2} // Set number of columns
      contentContainerStyle={styles.container}
    />

</Screen>

}
export default Dashboard;
const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    item: {
      flex: 1, // Ensures equal spacing
      margin: 10,
      backgroundColor: '#FFF',
      height: DEVICE_WIDTH / 2 - 40, // Calculate based on device width and margin
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
    },
    title: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    h1:{
        fontSize: 18,color: Colors.primary,
        width: 100,textAlign: 'center',
        marginVertical:5
    },
    h2:{
        fontSize: 18,color: Colors.primary,
       textAlign: 'center',fontWeight: 'bold',
      
    }, h3:{
        fontSize: 12,color: Colors.primary,
       textAlign: 'center',marginLeft:0
       
    },
    circle:{height:50,width:50,borderRadius:50,
        borderWidth:0.5,borderColor:Colors.primary,marginHorizontal:10,
        justifyContent:'center',alignItems:'center'}
  });