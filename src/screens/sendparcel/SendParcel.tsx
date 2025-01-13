import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Screen from '../../components/Screen';
import TextView from '../../components/TextView';
import CustomDropdown from '../../components/CustomDropdown';
import Colors from '../../theme/Colors';
import log from '../../utils/logs';
import CustomDateTimepicker from '../../components/CustomDateTimepicker';
import SimpleTextInput from '../../components/SimpleTextInput';
import {GetSeats, AddBookingConnection} from '../../apis-auth/apis';
import CustomButton from '../../components/CustomButton';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const SendParcel = ({route}) => {
  const navigation = useNavigation();
  let params = route?.params?.params;
  const userData = useSelector(state => state.UserDataReducer);
  log('==>params: ', params);
  const [citys, setCitys] = useState([
    'Gaborone',
    'Mahalapye',
    'Palapye',
    'Francistown',
    'Plumtree',
    'Bulawayo',
    'Gweru',
    'Kwekwe',
    'Kadoma',
    'Chegutu',
    'Harare',
    'Mbudzi',
    'Chivhu',
    'Mvuma',
    'Chaka',
    'Lundi',
    'Masvingo',
    'Beitbridge',
    'Ngundu',
    'Rutenga',
    'Musina',
    'Polokwane',
    'Midrand',
    'Bossman - Pretoria',
    'Johannesburg'


  ]);
  const [citys2, setCitys2] = useState([
    'Gaborone',
    'Mahalapye',
    'Palapye',
    'Francistown',
    'Plumtree',
    'Bulawayo',
    'Gweru',
    'Kwekwe',
    'Kadoma',
    'Chegutu',
    'Harare',
    'Mbudzi',
    'Chivhu',
    'Mvuma',
    'Chaka',
    'Lundi',
    'Masvingo',
    'Beitbridge',
    'Ngundu',
    'Rutenga',
    'Musina',
    'Polokwane',
    'Midrand',
    'Bossman - Pretoria',
    'Johannesburg'
  ]);

  const [currency, setCurrencies] = useState([
    'BWP',
    'USD',
    'ZAR',
    'VISA',
    'E-WALLET',
    'PAY TO CELL',
    'OFFICE PAID',
    'OFFICE PAID BW',
    'OFFICE PAID ZW',
    'VOUCHER',
    'REBOOK',
  ]);
  const [formData, setFormData] = useState({
    from: citys[0],
    name: '',
    contactnumber: '',
    price: '',
    currency: currency[0],
    sch_id: params.schedule_id,
    userid: userData?.UserData?.users_id,
  });
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const min = 11120; // Replace with your minimum value
  const max = 800000; // Replace with your maximum value
  // Generate random number between min and max (inclusive)
  const random = "SM"+Math.floor(Math.random() * (max - min + 1)) + min;


 
  const handlebook = async () => {
    if (formData.name == '') {
      Toast.show({type: 'error', text1: 'Please enter Name'});
      return;
    } else if (formData.contactnumber == '') {
      Toast.show({type: 'error', text1: 'Please enter Contact Number'});
      return;
    }   else {
      let temp={...formData,ticketNumber:random,date:""+moment().format('YYYY-MM-DD')}
      navigation.navigate('SendParcelDetail', {params:temp});
    }
  };
  return (
    <Screen title={'Send Parcle'} scroll={true} searchbar={false}>
      <View style={{padding: 20}}>
        <View style={styles.row}>
          <TextView style={styles.h1} text={'Date:'} />
          <TextView style={styles.h2} text={moment().format("YYYY-MM-DD")} />
        </View>

        <View style={styles.row}>
          <TextView style={styles.h1} text={'Ticket Number:'} />
          <TextView style={styles.h2} text={random} />
        </View>

        <SimpleTextInput
        style={{marginTop:30}}
          label={'Name'}
          value={formData.name}
          onChangeText={v => {
            setFormData({...formData, name: v});
          }}
        />

        <SimpleTextInput
          style={styles.space}
          label={'Contact Number'}
          value={formData.contactnumber}
          onChangeText={v => {
            setFormData({...formData, contactnumber: v});
          }}
        />
        <CustomDropdown
          title={'From'}
          style={{marginTop: 20}}
          label={formData?.from}
          tempdata={citys}
          onSelect={v => {
            setFormData({...formData, from: v});
            log('==>v', v);
          }}
        />
        <View style={styles.row}>
          <CustomDropdown
            title={''}
            style={{marginHorizontal:0,width:'50%',marginTop:0}}
            label={formData?.currency}
            tempdata={currency}
            onSelect={v => {
              setFormData({...formData, currency: v});
              log('==>v', v);
            }}
          />
          <View   style={styles.inputView}>
          <TextInput
          style={styles.input}
            value={formData.price}
            placeholder='0'
            onChangeText={v => {
              setFormData({...formData, price: v});
            }}
          />
          </View>
        </View>

 
        <CustomButton
          label={'Next'}
          loading={submitLoading}
          onPress={() => {
            handlebook();
          }}
        />
      </View>
    </Screen>
  );
};
export default SendParcel;
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  h1: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'bold',
    marginRight: 10,
  },
  h2: {
    fontSize: 14,
    color: Colors.light_dark_gray,
    marginRight: 10,
  },
  space: {
    marginTop: 20,
  },
  inputView:{
    justifyContent:'center',alignSelf:'center',marginTop:35,height:60,
    marginHorizontal:10,width:'40%',
     backgroundColor:Colors.white,paddingHorizontal:10,borderRadius:10,elevation:1
  },
  
  input:{
   textAlign:'center',
   },
});
