import React, { Component } from 'react';
import { Platform, StatusBar,View } from 'react-native';
import Colors from '../theme/Colors';



export default class AppStatusBar extends React.Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    let isIos = Platform.OS === 'ios'
    if (isIos) return <View style={{backgroundColor:Colors.primary}}></View>
    else if(this.props.type === 'custom') {

 
      return <StatusBar {...this.props} translucent={this.props.trans} backgroundColor={this.props.color} barStyle={this.props.barContent} />

    }else {

      return <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />


    }


  }
}
