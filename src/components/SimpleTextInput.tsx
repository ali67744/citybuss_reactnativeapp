import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  StatusBar,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Easing,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
  TextInput,
} from 'react-native';
import Colors from '../theme/Colors';
import TextView from '../components/TextView';
const {height, width} = Dimensions.get('window');
const SimpleTextInput = ({
  style,
  value,
  label,
  onChangeText,
  maxLength,
  keyboardType,
}) => {
  return (
    <View style={style}>
      <TextView style={styles.h1} text={label} />
      <View style={[styles.mainBody]}>
        <TextInput
          value={value}
          placeholder={label}
          style={{
            height: 40,
            padding: 5,
            fontFamily: 'SourceSansPro-Regular',
            fontSize: 14,
            color: Colors.primary,
          }}
          placeholderTextColor={'#cdcdcd'}
          maxLength={maxLength}
          keyboardType={keyboardType}
          onChangeText={onChangeText}></TextInput>
      </View>
    </View>
  );
};
export default SimpleTextInput;
const styles = StyleSheet.create({
  mainBody: {
    width: width / 1.1,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,

    elevation: 5,
    textColor: Colors.primary,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
  },
  h1: {fontSize: 18, color: '#000', marginHorizontal: 0},
});
