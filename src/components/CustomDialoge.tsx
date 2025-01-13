import React from "react";
import {View,StyleSheet,Image} from "react-native"
import { Dialog } from "react-native-simple-dialogs";
import Colors from "../theme/Colors";
import LottieView from 'lottie-react-native';
import TextView from "./TextView";
const CustomDialoge =({children, dialogVisible,setDialogVisible,text="",style})=> {
return(
    <Dialog
    visible={dialogVisible}
    title=""
    dialogStyle={[style,styles.progress]}
    onTouchOutside={() => setDialogVisible(false)}
    contentStyle={[style,styles.progress]}
    >
       {children}
        </Dialog>
)
}
export default CustomDialoge
const styles = StyleSheet.create({
    progress:{borderRadius:10,elevation: 10,
      backgroundColor:Colors.white,alignSelf:'center',},
    dialogStyle:{},
    image:{height:40,width:40,alignSelf: 'center',resizeMode: 'contain'}
});