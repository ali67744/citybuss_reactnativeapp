import React from "react";
import {View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, ImageBackground, StatusBar, Platform, SafeAreaView, TouchableWithoutFeedback, Keyboard, Animated, Easing, FlatList, ActivityIndicator, RefreshControl, Alert, TextInput} from "react-native";
import Colors from "../theme/Colors";
import TextView from "../components/TextView";
const {height,width}=Dimensions.get('window');
const CustomButton = ({style,onPress,label,loading}) => {
    return <TouchableOpacity disabled={loading} onPress={onPress} style={[styles.btn,style]}>
{loading? <ActivityIndicator color={'#FFF'}/>: <TextView style={styles.txt} text={label}/>}
        </TouchableOpacity>
    
}
export default CustomButton;
const styles=StyleSheet.create({
    btn:{
        height:60,backgroundColor:Colors.primary,
        borderRadius:10,marginHorizontal:10,marginVertical:20,
        justifyContent:'center',flex:1,
        alignItems: 'center',
    },
    txt:{textAlign:'center',fontSize:20,color:'#FFF'}


})
