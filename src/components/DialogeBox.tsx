import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Dialog } from "react-native-simple-dialogs";
import Colors from "../theme/Colors";
import TextView from "./TextView";
import {useDispatch} from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";

const DialogeBox = ({ dialogVisible, setDialogVisible, text, list,setLanguageList }) => {
    
    const dispatcher = useDispatch();
    
    const RadioButton = ({ text, onPress,active }) => {
        return (
            <TouchableOpacity 
            
            onPress={onPress}
            style={styles.radioContainer}>
                <View
                    style={[styles.radioCircle, { backgroundColor: active ? Colors.primary : Colors.white }]}
                ></View>
                <TextView style={styles.radioText} text={text} />


            </TouchableOpacity>
        )
    }
    const _handleRadioButton=(item, index) => {
        let get=[];
        list.map((itemer, indexer) =>{
            get.push({value:itemer.value,active:false})
        })
        get[index] = {value:item.value,active:true};
        setLanguageList(get);
        dispatcher({
            type: item.value,
           
          });
          AsyncStorage.setItem("@language",item.value)
    }
    return (
        <Dialog
            visible={dialogVisible}
            title=""
            dialogStyle={styles.progress}
            onTouchOutside={() => setDialogVisible(false)}
            contentStyle={styles.progress}
        >
            <TextView text={text} style={styles.txt} />

            {list?.map((item, index) => {
                return(
                    <RadioButton
                    onPress={()=>{
                        _handleRadioButton(item, index);
                    }}
                    text={item.value}
                    active={item.active}
                    />
                )
            })}


        </Dialog>
    )
}
export default DialogeBox
const styles = StyleSheet.create({
    progress: { borderRadius: 10, elevation: 10, justifyContent: 'center', backgroundColor: Colors.white, alignSelf: 'center', },
    dialogStyle: {},
    image: { height: 80, width: 80, alignSelf: 'center', resizeMode: 'contain' },
    txt: { fontSize: 16, fontWeight: 'bold', alignSelf: 'center', color: Colors.primary },
    radioContainer: {
        flexDirection: 'row', alignItems: 'center',marginTop:10
    },
    radioCircle: { height: 20, width: 20, borderRadius: 50, borderWidth: 0.5, borderColor: Colors.primary },
    radioText: { fontSize: 14, marginLeft: 10, marginRight: 10 }


});