import React from "react";
import {View,StyleSheet,Image} from "react-native"
import { Dialog } from "react-native-simple-dialogs";
import Colors from "../theme/Colors";
import LottieView from 'lottie-react-native';
import TextView from "./TextView";
const CustomProgressDialog =({dialogVisible,setDialogVisible,text="Please wait..."})=> {
return(
    <Dialog
    visible={dialogVisible}
    title=""
    dialogStyle={styles.progress}
    onTouchOutside={() => setDialogVisible(false)}
    contentStyle={styles.progress}
    >
        <Image
        style={styles.image}
        source={require('../assets/images/logobg.png')}
        ></Image>

         <LottieView
        source={require('../assets/animations/loadinganimation.json')}
        colorFilters={[
          {
            keypath: 'button',
            color: '#F00000',
          },
          {
            keypath: 'Sending Loader',
            color: '#F00000',
          },
        ]}
        style={{height: 80, width:80,alignSelf:'center'}}
        autoPlay
        loop
      />
        <TextView text={text} style={{alignSelf: 'center',fontSize:10,color: Colors.mediumGray}}/>
        
        </Dialog>
)
}
export default CustomProgressDialog
const styles = StyleSheet.create({
    progress:{height:150,width:150,borderRadius:10,elevation: 10,justifyContent:'center',backgroundColor:Colors.white,alignSelf:'center',},
    dialogStyle:{},
    image:{height:40,width:40,alignSelf: 'center',resizeMode: 'contain'}
});