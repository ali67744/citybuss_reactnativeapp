import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { View,StyleSheet,Image } from 'react-native'
import {useDispatch} from 'react-redux';

const Splash=({navigation})=>{
    const dispatcher = useDispatch();

   useEffect(()=>{
    getUserData()
   },[]);

   const getUserData = async() => {
   let get=await AsyncStorage.getItem("@userData")
   var parser= JSON.parse(get);
   let language=await AsyncStorage.getItem("@language")
  console.log(language);



   setTimeout(() =>{
    console.log("User data loaded",parser);
    if(parser==null){
        navigation.replace("LoginScreen")
    }else{
        dispatcher({
            type: 'UserData',
            payload: parser,
          });
          dispatcher({
            type: language==null || language?.length === 0 ? "English":language, 
          });


        navigation.replace("Dashboard")
    }
   },3000)

}
    return(
        <View style={styles.splash}>
            <Image style={styles.image} 
            source={require('../assets/images/splashlogo.png')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    splash:{backgroundColor:'#FFF',flex:1,justifyContent: 'center'},
    image:{alignSelf: 'center',justifyContent: 'center',height:200,width:200,resizeMode:'contain'}
})
export default Splash;