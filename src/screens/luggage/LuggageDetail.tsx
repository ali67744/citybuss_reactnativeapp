import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Screen from '../../components/Screen';
import TextView from '../../components/TextView';
import CustomDropdown from '../../components/CustomDropdown';
import Colors from '../../theme/Colors';
import log from '../../utils/logs';
import CustomDateTimepicker from '../../components/CustomDateTimepicker';
import SimpleTextInput from '../../components/SimpleTextInput';
import {GetSeats, AddBookingConnection, AddLuggaugeBookingConnection} from '../../apis-auth/apis';
import CustomButton from '../../components/CustomButton';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const LuggageDetail = ({route}) => {
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
  ]);
  const [citys2, setCitys2] = useState([
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
    'Johannesburg',
    'Harare',
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
    to: params?.starting_point,
    recipt_name: '',
    recipt_contactnumber: '',
    luggageValue: '',
    valueCurrency: currency[0],
    luggageDescription: '',
    sch_id: params.schedule_id,
    userid: userData?.UserData?.users_id,
    tempArr:[]
  });
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (
      (params?.starting_point?.includes('Johannesburg') &&
        params?.destination?.includes('Harare')) ||
      (params?.starting_point?.includes('Harare') &&
        params?.destination?.includes('Johannesburg'))
    ) {
      setCitys(citys2);
    }
  }, []);

 
  const handlebook = async () => {
    
    if (formData.tempArr.length == 0 && formData.recipt_name=='') {
      Toast.show({type: 'error', text1: 'Please add at least one'});
      return;
    } else if (formData.contactnumber == '') {
      Toast.show({type: 'error', text1: 'Please enter Contact Number'});
      return;
    }   else {
      let temp=[...formData.tempArr];
      if(formData.tempArr.length==0){
      temp.push({
        "laggage_description":formData.luggageDescription,
        "currency":formData.valueCurrency,
        "price":formData.luggageValue,
        "rec_fullname":formData.recipt_name,
        "rec_phone":formData.recipt_contactnumber,
        "destination":formData.to
      })
      }
      setSubmitLoading(true)
      let res=await AddLuggaugeBookingConnection(params,orderNumRandom,temp);
      log("==> result: " , res)
      Toast.show({type:'success',text1:'Success'})
      setSubmitLoading(false)
      let ss = "https://citybuscoaches.com/AppApi/print_tp/" + res;
      let param={url:ss,num:"ticket_" + res,id:res};
      navigation.navigate('ViewTicket',{params:param})
    }
  };
  const handleAddMore = async () => {
    if (formData.luggageDescription == '') {
      Toast.show({type: 'error', text1: 'Please enter Description'});
      return;
    } else if (formData.luggageValue == '') {
      Toast.show({type: 'error', text1: 'Please enter Luggauge Value'});
      return;
    }else if (formData.recipt_name == '') {
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
      
      <View>
<TextView style={ { fontSize: 18, color: '#000',marginHorizontal:0 }} text={"Luggage Details"}/>
<View   style={styles.inputView2}>
          <TextInput
          style={styles.input2}
            value={formData.luggageDescription}
            placeholder='Description..'
            onChangeText={v => {
              setFormData({...formData, luggageDescription: v});
            }}
          />
          </View>

      </View>
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
         <CustomDropdown
            title={'Value Currency'}
            style={{marginHorizontal:0,marginTop:20}}
            label={formData?.valueCurrency}
            tempdata={currency}
            onSelect={v => {
              setFormData({...formData, valueCurrency: v});
              log('==>v', v);
            }}
          />
        <SimpleTextInput
        style={{marginTop:30}}
          label={'Lugguage Value'}
          value={formData.luggageValue}
          onChangeText={v => {
            setFormData({...formData, luggageValue: v});
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
        <CustomButton
          label={'Cancel'}
          onPress={() => {
           navigation.goBack()
          }}
        />

<CustomButton
          label={'Add More'}
          onPress={() => {
            handleAddMore()
          }}
        />
        </View>
        <CustomButton
        style={{marginTop:-10}}
          label={'Book'}
          loading={submitLoading}
          onPress={() => {
            handlebook();
          }}
        />
      </View>
    </Screen>
  );
};
export default LuggageDetail;
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
     backgroundColor:Colors.white,paddingHorizontal:10,borderRadius:10,elevation:1,
    paddingVertical:10,
     textAlign:'center',
     shadowColor: '#000',
     backgroundColor:Colors.white,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.25,
      shadowRadius: 1.84,
     
  },
  
  input2:{
    
   },
});
