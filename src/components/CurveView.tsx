import React from 'react';
import { StyleSheet, View,  Image, Dimensions, ImageSourcePropType } from 'react-native';
import Colors from '../theme/Colors';

type propTypes = {
  children: JSX.Element
  bgImage: ImageSourcePropType
}

const { height, width } = Dimensions.get('window')


const CurveView = ({ children, bgImage,curveViewStyle }: propTypes) => {



  return (
    <View style={styles.container}>

      <Image
        source={bgImage}
        style={styles.bgImage}
      />

      <View style={[styles.curveView,curveViewStyle]}>

        {children}

      </View>

    </View>
  )
}

export default CurveView

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  bgImage: { height: height / 2, width: width/2, resizeMode: "contain", marginTop: -10,alignSelf:'center' },
  curveView: {
    borderTopRightRadius: 40, borderTopLeftRadius: 40, backgroundColor: Colors.white, 
    marginTop: -140, flex: 1, justifyContent: "center",padding:10
}



})
