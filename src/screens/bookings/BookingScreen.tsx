import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Screen from '../../components/Screen';
import TextView from '../../components/TextView';
import CustomDropdown from '../../components/CustomDropdown';
import Colors from '../../theme/Colors';
import log from '../../utils/logs';
import CustomDateTimepicker from '../../components/CustomDateTimepicker';
import SimpleTextInput from '../../components/SimpleTextInput';
import {GetSeats,AddBookingConnection} from '../../apis-auth/apis';
import CustomButton from '../../components/CustomButton';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const BookingScreen = ({route}) => {
  const navigation=useNavigation();
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
    from: params?.starting_point,
    to: params?.destination,
    departureTime: params?.departure_time,
    name: '',
    passportnumber: '',
    contactnumber: '',
    optn: '',
    seatno: '',
    price: '',
    currency: currency[0],
    stinpend: '',
    currency2: currency[0],
    sch_id:params.schedule_id,
    userid:userData?.UserData?.users_id
  });
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    getSeats();
    if (
      (params?.starting_point?.includes('Johannesburg') &&
        params?.destination?.includes('Harare')) ||
      (params?.starting_point?.includes('Harare') &&
        params?.destination?.includes('Johannesburg'))
    ) {
      setCitys(citys2);
    }
  }, []);
  function getAvailableSeats(seatsData, capacity) {
    log("==> capacity",capacity)

    let availableSeats = [];

    for (let i = 1; i <= capacity; i++) {
        let seatKey = `s${i}`;
        if (seatsData[seatKey] === "available") {
            availableSeats.push(i);
        }
    }
    log("==> availableSeats",availableSeats)

    return availableSeats;
}
  const transformSeats = (capacity,seatsData) => {
    log("==> transformSeats",capacity)
    const availableSeats = Object.keys(seatsData)
        .filter(key => key.startsWith('s') && seatsData[key] === "available")
        .map(key => parseInt(key.replace('s', ''), 10))
        .sort((a, b) => a - b);

    return availableSeats.slice(0, Math.min(capacity, availableSeats.length)); // Ensure it doesn't exceed available seats
  
  };
  const getSeats = async () => {
    setLoading(true);
    let res = await GetSeats(params.schedule_id);
    let parser = JSON.parse(res);
    log("Seats: " , parser?.seats);
    let temp=getAvailableSeats(parser?.seats[0],Number(params?.capacity??0))
    // let temp = transformSeats(Number(params?.capacity??0),parser?.seats[0]);
    setFormData({...formData, seatno: temp[0]});
    setSeats(temp);
    log('==>res', temp);
    setLoading(false);
  };
  const handlebook=async()=>{
    if(formData.name==''){
      Toast.show({type: 'error', text1:"Please enter Name"})
      return 
    }else if(formData.passportnumber==''){
      Toast.show({type: 'error', text1:"Please enter Passport Number"})
      return 
    }else if(formData.contactnumber==''){
      Toast.show({type: 'error', text1:"Please enter Contact Number"})
      return 
    }else if(formData.price==''){
      Toast.show({type: 'error', text1:"Please enter Price"})
      return 
    }else{
      setSubmitLoading(true)
      let res=await AddBookingConnection(formData);
      log("==> result: " , res)
      Toast.show({type:'success',text1:'Success'})
      setSubmitLoading(false)
      let ss = "https://citybuscoaches.com/AppApi/print_tp/" + res;
      let param={url:ss,num:"ticket_" + res,id:res};
      navigation.navigate('ViewTicket',{params:param})

      
    }

  }
  return (
    <Screen title={'Add'} scroll={true} searchbar={false}>
      <View style={{padding: 20}}>
        <View style={styles.row}>
          <TextView style={styles.h1} text={'Date/Time:'} />
          <TextView style={styles.h2} text={params?.date_created} />
        </View>

        <View style={styles.row}>
          <TextView style={styles.h1} text={'Bus No:'} />
          <TextView style={styles.h2} text={params?.bus_number} />
        </View>

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

        <CustomDropdown
          title={'To'}
          label={formData?.to}
          style={{marginTop: 20}}
          tempdata={citys}
          onSelect={v => {
            setFormData({...formData, to: v});
            log('==>v', v);
          }}
        />

        <CustomDateTimepicker
          style={{marginTop: 20}}
          title={'Departure Time'}
          defaultValue={formData?.departureTime}
          mode={'time'}
          onChange={v => {
            log('==>v', v);
            setFormData({...formData, departureTime: moment(v).format("LTS")});
          }}
        />

        <SimpleTextInput
          label={'Name , Surname'}
          value={formData.name}
          onChangeText={v => {
            setFormData({...formData, name: v});
          }}
        />

        <SimpleTextInput
          style={styles.space}
          label={'Passport Number'}
          value={formData.passportnumber}
          onChangeText={v => {
            setFormData({...formData, passportnumber: v});
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

        <SimpleTextInput
          style={styles.space}
          label={'OP-TN'}
          value={formData.optn}
          onChangeText={v => {
            setFormData({...formData, optn: v});
          }}
        />

        <CustomDropdown
          title={'Seat No'}
          style={{marginTop: 20}}
          label={formData?.seatno}
          tempdata={seats}
          sortingTrue={false}
          onSelect={v => {
            setFormData({...formData, seatno: v});
            log('==>v', v);
          }}
        />

        <SimpleTextInput
          style={styles.space}
          label={'Price'}
          value={formData.price}
          onChangeText={v => {
            setFormData({...formData, price: v});
          }}
        />

        <CustomDropdown
          title={'Currency'}
          style={{marginTop: 20}}
          label={formData?.currency}
          tempdata={currency}
          onSelect={v => {
            setFormData({...formData, currency: v});
            log('==>v', v);
          }}
        />

        <SimpleTextInput
          style={styles.space}
          label={'Stipend'}
          value={formData.stinpend}
          onChangeText={v => {
            setFormData({...formData, stinpend: v});
          }}
        />

        <CustomDropdown
          title={'Currency'}
          style={{marginTop: 20}}
          label={formData?.currency2}
          tempdata={currency}
          onSelect={v => {
            setFormData({...formData, currency2: v});
            log('==>v', v);
          }}
        />
        <CustomButton label={"Book"} loading={submitLoading} onPress={()=>{handlebook()}}/>
      </View>
    </Screen>
  );
};
export default BookingScreen;
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
});
