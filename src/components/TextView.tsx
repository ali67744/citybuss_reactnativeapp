import React,{memo} from "react";
import {
    View,
    Text,
    Pressable,
    TextInput,
    Dimensions,
    StyleSheet,
    Alert,
  } from "react-native";
const {height, width} = Dimensions.get('window');

const TextView=({style,text,type})=>{
  let styleByType = getStyleByType(type);

return (

      <Text
      adjustsFontSizeToFit
      style={[styleByType,style]}
      >
    {text}
      </Text>

)
}
let getStyleByType = type => {
    switch (type) {
      case 'heading':
        return styles.textSign;
  
      case 'mini_heading22':
        return styles.mini_heading;
  
      case 'description13':
        return styles.description;
  
      case 'mini_description':
        return styles.mini_description;
  
      case 'normalRg':
        return styles.normalRg;
  
      case 'normalRg':
        return styles.normalRg;
  
      case 'headingMid':
        return styles.headingMid;
      case 'heading_20':
        return styles.heading_20;
      case 'small':
        return styles.small;
      case 'normalMini':
        return styles.normalMini;
      case 'bottomtext':
        return styles.bottomtext;
      case 'Login':
        return styles.Login;
        case 'Light':
          return styles.extraLight;
          case 'formLabel':
          return styles.formLabel;
  
      default:
        return styles.normal;
    }
  };
const styles = StyleSheet.create({
    textSign: {
        fontSize: 18,
        fontWeight: "bold",
      },
      heading: {
        // fontSize: 26,
        fontSize: width / 20,
      },
      headingMid: {
        // fontSize: 18,
        fontSize: width / 22,
        // fontFamily: 'PoppinsLight',
      },
      mini_heading: {
        // fontSize: 22, fontFamily: 'PoppinsLight', textAlign: 'center'
        fontSize: width / 18.5,
        // fontFamily: 'PoppinsBold',
        textAlign: 'center',
      },
      heading_20: {
        fontSize: width / 25,
        textAlign: 'center',
      },
      description: {
        // fontSize: 13, fontFamily: 'PoppinsRegular', textAlign: 'center', color: "#666666"
        fontSize: width / 30,
        textAlign: 'center',
        color: '#9B9B9B',
      },
      mini_description: {
        // fontSize: 12, fontFamily: 'PoppinsRegular', color: "#9F9F9F"
        fontSize: width / 30,
        fontFamily: 'SourceSansPro-Regular',
        color: '#9F9F9F',
      },
      normalRg: {
        fontSize: width / 33,
        fontFamily: "SourceSansPro-Regular"
      },
    
      normalMd: {
        // fontSize: 14,
        fontSize: width / 30,
        fontFamily: "SourceSansPro-Regular"
      },
    
      normalMini: {
        fontSize: 14, 
      },
    
      normal: {
        // fontSize: 16, 
        fontFamily: 'SourceSansPro-Regular',
        fontSize: width / 25,
        color: '#9B9B9B',
      },
    
      small: {
        fontSize: width / 28,
      },
    
      extraLight: {
        fontSize: 14, // fontFamily: 'extraLight'
      },
      formLabel: {
        fontSize: 12, // fontFamily: 'extraLight'
      },
      bottomtext: {
        fontSize: 13,
      },
      Login: {
        fontSize: 25,
      },

})
export default memo(TextView);