import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Screen from '../../components/Screen';
import TextView from '../../components/TextView';
import CustomDropdown from '../../components/CustomDropdown';
import Colors from '../../theme/Colors';
import log from '../../utils/logs';
import CustomDateTimepicker from '../../components/CustomDateTimepicker';
import SimpleTextInput from '../../components/SimpleTextInput';
import {GetSeats, AddBookingConnection, AddLuggaugeBookingConnection, SendParcleConnection} from '../../apis-auth/apis';
import CustomButton from '../../components/CustomButton';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const SendParcelDetail = ({route}) => {
  const navigation = useNavigation();
  let params = route?.params?.params;
  const min = 1; // Replace with your minimum value
  const max = 100; // Replace with your maximum value
  // Generate random number between min and max (inclusive)
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  // Create the order number
  const orderNumRandom = `#909_${random}`;
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
    to: citys[0],
    recipt_name: '',
    recipt_contactnumber: '',
    passportNumber: '',
    userid: userData?.UserData?.users_id,
    currency1:currency[0],
    price1:"",
    currency2:currency[0],
    price2:"",
  });
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  

 
  const handlebook = async () => {
    if (formData.passportNumber == '') {
      Toast.show({type: 'error', text1: 'Please enter Passport Number'});
      return;
    }
    else if (formData.recipt_name == '') {
      Toast.show({type: 'error', text1: 'Please enter Contact Number'});
      return;
    }
   else if (formData.recipt_contactnumber == '') {
      Toast.show({type: 'error', text1: 'Please enter Contact Number'});
      return;
    }   else {
      let temp=[{
        "rec_fullname": formData.recipt_name,
        "rec_phone": formData.recipt_contactnumber,
        "passport_numb": formData.passportNumber,
        "currency": formData.currency1,
        "price": formData.price1,
        "payoutcurrency": formData.currency2,
        "payoutprice": formData.price2,
        "to": formData.to,
      }]
      setSubmitLoading(true)
    
      let res=await SendParcleConnection(params,temp);
      log("==> result: " , res)
      Toast.show({type:'success',text1:'Success'})
      setSubmitLoading(false)
      let ss = "https://citybuscoaches.com/AppApi/print_sm/" + res;
      let param={url:ss,num:"ticket_" + res,id:res};
      navigation.navigate('ViewTicket',{params:param})
    }
  };
  const handleAddMore = async () => {
     if (formData.recipt_name == '') {
      Toast.show({type: 'error', text1: 'Please enter Recipient Name'});
      return;
    }else if (formData.recipt_contactnumber == '') {
      Toast.show({type: 'error', text1: 'Please enter Recipient Number'});
      return;
    }   else {

      let temp=[...formData.tempArr];
      temp.push({
        "laggage_description":formData.luggageDescription,
        "currency":formData.valueCurrency,
        "price":formData.luggageValue,
        "rec_fullname":formData.recipt_name,
        "rec_phone":formData.recipt_contactnumber,
        "destination":formData.to
      })
      setFormData({...formData,tempArr:temp,
        luggageDescription:'',
        valueCurrency:currency[0],
        luggageValue:'',
        recipt_name:'',
        recipt_contactnumber:'',

      });
      
    }
  };
  return (
    <Screen title={'Details'} scroll={true}>
      <View style={{padding: 20}}>
      
     
      <CustomDropdown
          title={'To'}
          style={{marginTop: 20}}
          label={formData?.to}
          tempdata={citys}
          onSelect={v => {
            setFormData({...formData, to: v});
            log('==>v', v);
          }}
        />

<SimpleTextInput
        style={{marginTop:30}}
          label={'Receiver Passport Number'}
          value={formData.passportNumber}
          onChangeText={v => {
            setFormData({...formData, passportNumber: v});
          }}
        />

<SimpleTextInput
        style={{marginTop:30}}
          label={'Recipient Name or SurName'}
          value={formData.recipt_name}
          onChangeText={v => {
            setFormData({...formData, recipt_name: v});
          }}
        />

        <SimpleTextInput
          style={styles.space}
          label={'Recipient Contact Number'}
          value={formData.recipt_contactnumber}
          onChangeText={v => {
            setFormData({...formData, recipt_contactnumber: v});
          }}
        />

        
        
        
       
<View style={styles.row}>
          <CustomDropdown
            title={''}
            style={{marginHorizontal:0,width:'50%',marginTop:0}}
            label={formData?.currency1}
            tempdata={currency}
            onSelect={v => {
              setFormData({...formData, currency1: v});
              log('==>v', v);
            }}
          />
          <View   style={styles.inputView}>
          <TextInput
          style={styles.input}
            value={formData.price1}
            placeholder='0'
            onChangeText={v => {
              setFormData({...formData, price1: v});
            }}
          />
          </View>
        </View>

        <View style={styles.row}>
          <CustomDropdown
            title={''}
            style={{marginHorizontal:0,width:'50%',marginTop:0}}
            label={formData?.currency2}
            tempdata={currency}
            onSelect={v => {
              setFormData({...formData, currency2: v});
              log('==>v', v);
            }}
          />
          <View   style={styles.inputView}>
          <TextInput
          style={styles.input}
            value={formData.price2}
            placeholder='0'
            onChangeText={v => {
              setFormData({...formData, price2: v});
            }}
          />
          </View>
        </View>
        <CustomButton
        style={{marginTop:20}}
          label={'Send Parcel'}
          loading={submitLoading}
          onPress={() => {
            handlebook();
          }}
        />
      </View>
    </Screen>
  );
};
export default SendParcelDetail;
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
   inputView2:{
   marginTop:15,height:100,
    marginHorizontal:0,
     backgroundColor:Colors.white,paddingHorizontal:10,borderRadius:10,elevation:1
  },
  
  input2:{
   },
});
