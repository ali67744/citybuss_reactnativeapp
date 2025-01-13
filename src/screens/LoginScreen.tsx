import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStatusBar from '../components/AppStatusBar';
import TextView from '../components/TextView';
import CurveView from '../components/CurveView';
import CustomTextInput from '../components/CustomTextInput';
import Toast from 'react-native-toast-message';
import {connect, useSelector} from 'react-redux';

import {LoginConnection, RegisterConnection} from '../apis-auth/apis';
const {width, height} = Dimensions.get('window');
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../theme/Colors';
import moment from 'moment';
import { Log } from '../components/Log';
const LoginScreen = ({navigation}) => {
  const refInput2 = React.useRef();
  const [loginLoader, setLoginLoader] = useState(false);
  const [passwordshow, setPasswordShow] = useState(false);
  const [passwordshow2, setPasswordShow2] = useState(false);

  const [loginData, setLoginData] = React.useState({email: '', password: ''});
  const [signupData, setsignuData] = React.useState({
    fullname: '',
    cnic: '',
    phonenum: '',
    dob: '',
    email: '',
    password: '',
    c_password: '',
  });
  const Language = useSelector(state => state.LanguageReducer);

  const [viewNum, setViewNum] = React.useState(1);
  const dispatcher = useDispatch();
 


  const _handleLogin = () => {
    if (loginData.email == '') {
      Alert.alert('Stop!', 'Type Email..');
      return;
    } else if (loginData.password == '') {
      Alert.alert('Stop!', 'Type Password..');
      return;
    }
    setLoginLoader(true);
    LoginConnection(loginData.email, loginData.password)
      .then(res => {
        var parser = JSON.parse(res);
        console.log('===>', parser);
      
        if (parser?.res?.users_id != '-1') {
        Toast.show({type:'success', text1:'Success', text2:''});

          AsyncStorage.setItem("@userData", JSON.stringify(parser?.res));
          dispatcher({
            type: 'UserData',
            payload: parser?.res,
          });
          navigation.replace('Dashboard');
        } else {
        Toast.show({type:'error', text1:'Stop', text2:'Invalid Username or Password'})
          
          // Alert.alert('Stop!', 'Invalid Username or Password');
        }

        setLoginLoader(false);
      })
      .catch(e => {
        setLoginLoader(false);

        console.log(e);
      });
  };

  const _handleSignUp = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (signupData.fullname == '') {
      Alert.alert('Stop!', 'Type Full Name..');
      return;
    } else if (signupData.fullname.length < 4) {
      Alert.alert('Stop!', 'Type Valid Full Name..');
      return;
    }
     else if (signupData.cnic == '') {
      Alert.alert('Stop!', 'Type Cnic..');
      return;
    } 
    else if (
      signupData.cnic == '00000-0000000-0') {
      Alert.alert('Stop!', 'Type Valid Cnic..');
      return;
    }
     else if (signupData.phonenum == '') {
      Alert.alert('Stop!', 'Type Phoneno');
      return;
    } else if (signupData.phonenum.length < 11) {
      Alert.alert('Stop!', 'Type valid Phoneno');
      return;
    } else if (signupData.dob == '') {
      Alert.alert('Stop!', 'Select DOB..');
      return;
    } 
    // else if (signupData.email == '') {
    //   Alert.alert('Stop!', 'Type Email..');
    //   return;
    // } else if (reg.test(signupData.email) === false) {
    //   Alert.alert('Stop!', 'Type Valid Email..');
    //   return;
    // }
     else if (signupData.password == '') {
      Alert.alert('Stop!', 'Type Password..');
      return;
    }
    console.log(signupData);
    setLoginLoader(true);
    
   
  };

  const _onHide = () => {
    setPasswordShow(!passwordshow);
  };
  const _onHide2 = () => {
    setPasswordShow2(!passwordshow2);
  };

  React.useEffect(() => {}, []);

  return (
    <>
      <AppStatusBar />
      <CurveView
        curveViewStyle={{marginTop: viewNum == 1 ? -80 : -140}}
        bgImage={require('../assets/images/splashlogo.png')}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
          // style={[
          //   styles.back1,
          //   {height: viewNum == 1 ? height / 1.7 : height / 1.2},
          // ]}
          >
            {viewNum == 1 ? (
              <View>
                <TextView
                  text={Language.Login}
                  style={{
                    fontSize: width / 20,
                    fontWeight: 'bold',
                    marginLeft: 30,
                    marginRight: 30,

                    color: Colors.black,
                  }}></TextView>
                <TextView
                  text={Language.pleaseSigntocontinue}
                  style={{
                    fontSize: width / 30,
                    fontWeight: 'bold',
                    marginBottom: height / 20,
                    marginLeft: 30,
                    marginRight: 30,
                    color: '#cdcdcd',
                  }}></TextView>

                <CustomTextInput
                  autoFocus={true}
                  returnKeyType="next"
                  // onSubmitEdsiting={() => refInput2.current.focus()}
                  onChangeText={text => {
                    setLoginData({...loginData, email: text});
                  }}
                  label={Language.email}
                  value={loginData.email}></CustomTextInput>
                <CustomTextInput
                  password={true}
                  style={{marginTop: 20, marginBottom: 20}}
                  value={loginData.password}
                  onChangeText={text =>
                    setLoginData({...loginData, password: text})
                  }
                  label={Language.password}
                  returnKeyType="go"
                  onSubmitEditing={() => {
                    _handleLogin();
                  }}
                  _onHide={_onHide}
                  passwordshow={passwordshow}
                  refs={refInput2}
                  // password={true}
                />

                {loginLoader && (
                  <ActivityIndicator size={'small'} color={Colors.primary} />
                )}

                <TouchableOpacity
                  onPress={() => _handleLogin()}
                  style={styles.button}>
                  <TextView
                    text={Language.Login}
                    style={styles.buttonText}></TextView>
                </TouchableOpacity>

              

                {/* <TouchableOpacity
                  onPress={() => {
                    setViewNum(2);
                  }}
                  style={{
                    alignSelf: 'center',
                    marginBottom: 30,
                    marginTop: 30,
                  }}>
                  <TextView
                    text={Language.donthaveanaccountsignup}
                    style={{
                      alignSelf: 'center',
                      color: Colors.primary,
                    }}></TextView>
                </TouchableOpacity> */}
              </View>
            ) : (
              viewNum == 2 && (
                <View>
                   <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: height / 20,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          setViewNum(1);
                        }}
                        style={{marginLeft: 0}}>
                        <Ionicons
                          name="chevron-back"
                          color={Colors.primary}
                          size={30}
                        />
                      </TouchableOpacity>
                      <View style={{}}>
                        <TextView
                          text={Language.signup}
                          style={{
                            fontSize: width / 20,
                            fontWeight: 'bold',
                            marginLeft: 10,
                            color: Colors.black,
                          }}></TextView>
                        <TextView
                          text={Language.pleaseSignuptocontinue}
                          style={{
                            fontSize: width / 30,
                            fontWeight: 'bold',
                            marginLeft: 10,
                            color: '#cdcdcd',
                          }}></TextView>
                      </View>
                    </View>
                  <View
                  style={{marginLeft:10,marginRight:10}}
                  >
                   

                    <CustomTextInput
                      autoCapitalize="none"
                      value={signupData.fullname}
                      onChangeText={text =>
                        setsignuData({...signupData, fullname: text})
                      }
                      label={Language.typeFullname}
                      autoFocus={true}
                      returnKeyType="next"
                      placeholderTextColor={'#B1B1B1'}
                    />
                    <CustomTextInput
                      autoCapitalize="none"
                      value={signupData.cnic}
                      onChangeText={text =>
                        setsignuData({...signupData, cnic: text})
                      }
                      keyboardType={'number-pad'}
                      maxLength={16}
                      label={Language.typeCnic}
                      placeholderTextColor={'#B1B1B1'}
                      returnKeyType="next"
                      style={[{marginTop: 10}]}></CustomTextInput>
                    {/* <CustomTextInput
                      autoCapitalize="none"
                      value={signupData.phonenum}
                      onChangeText={text =>
                        setsignuData({...signupData, phonenum: text,email:text})
                      }
                      keyboardType={'number-pad'}
                      maxLength={11}
                      label={Language.typeMobile}
                      placeholderTextColor={'#B1B1B1'}
                      returnKeyType="next"
                      style={[{marginTop: 10}]}></CustomTextInput> */}

                    <CustomTextInput
                      autoCapitalize="none"
                      value={signupData.email}
                      onChangeText={text =>
                        setsignuData({...signupData, email: text})
                      }
                      label={Language.email}
                      placeholderTextColor={'#B1B1B1'}
                      keyboardType="email-address"
                      returnKeyType="next"
                      style={[ {marginTop: 10}]}></CustomTextInput>

                    <CustomTextInput
                    password={true}
                      autoCapitalize="none"
                      value={signupData.password}
                      onChangeText={text =>
                        setsignuData({...signupData, password: text})
                      }
                      label={Language.password}
                      placeholderTextColor={'#B1B1B1'}
                      // keyboardType="email-address"
                      secureTextEntry={true}
                      returnKeyType="go"
                      _onHide={_onHide2}
                      passwordshow={passwordshow2}
                      onSubmitEditing={() => {
                        _handleLogin();
                      }}
                      style={[{marginTop: 10}]}></CustomTextInput>
                    {/* <TouchableOpacity
                      onPress={() => {
                        setDatePickerVisibility(true);
                      }}
                      style={[styles.input, {marginTop: 20}]}>
                      <TextView
                        text={
                          signupData.dob == ''
                            ? Language.selectDob
                            : signupData.dob
                        }
                        style={{color: '#B1B1B1', fontSize: 24}}></TextView>
                    </TouchableOpacity> */}
                    {loginLoader && (
                      <ActivityIndicator
                        size={'small'}
                        color={Colors.primary}
                      />
                    )}

                    <TouchableOpacity
                      onPress={() => {
                        _handleSignUp();
                      }}
                      style={styles.button}>
                      <TextView
                        text={Language.signup}
                        style={styles.buttonText}></TextView>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setViewNum(1);
                      }}
                      style={{
                        alignSelf: 'center',
                        marginBottom: 30,
                        marginTop: 30,
                      }}>
                      <TextView
                        text={Language.alreadyhaveanaccount}
                        style={{
                          alignSelf: 'center',
                          color: Colors.primary,
                        }}></TextView>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            )}
          </View>
        </ScrollView>
      </CurveView>

     
    </>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  back1: {
    position: 'absolute',
    bottom: 1,
    padding: 10,
    justifyContent: 'center',
    width: width,
    elevation: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#FFF',
  },
  input: {
    height: 50,
    marginBottom: 10,
    alignSelf: 'center',
   
    borderRadius: 10,
    borderWidth: 1,
    
    borderColor: Colors.primary,
    marginTop: 10,
    padding: 10,
    fontSize: 20,
    color: '#000',
  },
  input2: {
    height: 50,
    alignSelf: 'center',
    width: width / 1.5,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: '#000',
    marginTop: 10,
    padding: 10,
    fontSize: 20,
    color: '#000',
  },
  button: {
    height: 50,
    width: width / 2,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: height / 15,
  },
  buttonTwo: {
    height: 50,
    width: width / 1.2,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
