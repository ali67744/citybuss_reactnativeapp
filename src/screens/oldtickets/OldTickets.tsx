import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Screen from '../../components/Screen';
import TextView from '../../components/TextView';
const DEVICE_WIDTH = Dimensions.get('window').width;
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../theme/Colors';
import {connect, useSelector} from 'react-redux';
import {GetOldBookings} from '../../apis-auth/apis';
import log from '../../utils/logs';
import CustomProgressDialog from '../../components/CustomProgressDialoge';
import {useNavigation} from '@react-navigation/native';

const ListItem = ({item,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View style={[styles.row,styles.line]}>
        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Date'} />
          <TextView style={styles.h2} text={item?.schedule_date} />
        </View>

        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Ticket No'} />
          <TextView style={styles.h2} text={item?.ticket_no} />
        </View>
      </View>

      <View style={[styles.row,styles.line]}>

        <View style={styles.view1}>
          <TextView style={styles.h1} text={'From'} />
          <TextView style={styles.h2} text={item?.starting_point} />
        </View>

        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Destination'} />
          <TextView style={styles.h2} text={item?.destination} />
        </View>
      </View>

      <View style={[styles.row,styles.line]}>

        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Name'} />
          <TextView style={styles.h2} text={item?.passenger_name} />
        </View>

        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Passport No'} />
          <TextView style={styles.h2} text={item?.passport_number} />
        </View>

       
      </View>

      <View style={[styles.row,styles.line]}>

        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Contact'} />
          <TextView style={styles.h2} text={item?.contact_no} />
        </View>

        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Seat No'} />
          <TextView style={styles.h2} text={item?.seat_number} />
        </View>

       
      </View>

      <View style={[styles.row]}>

        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Price'} />
          <TextView style={styles.h2} text={item?.price} />
        </View>

        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Status'} />
          <TextView style={styles.h2} text={item?.status} />
        </View>

       
      </View>
    </TouchableOpacity>
  );
};
const OldTickets = ({route}) => {
  let params = route?.params?.params;
  const comeFrom=params;
  log('==>params: ', params);
  const userData = useSelector(state => state.UserDataReducer);
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation=useNavigation();

  useEffect(() => {
    getOldBooking();
  }, []);
  const getOldBooking = async () => {
    setLoading(true);
    let res = await GetOldBookings();
    let parser = JSON.parse(res);
    setList(parser?.bookings);
    setList2(parser?.bookings);
    // log("==>res",parser?.trip);
    setLoading(false);
  };
  const renderItem = ({item}) => {
    return <ListItem item={item} onPress={()=>{
        log("==>renderItem",item)
        // return
        let ss = "https://citybuscoaches.com/AppApi/print_tp/" + item?.ticket_id;
        let param={url:ss,num:"ticket_" +  item?.ticket_id,id:item?.ticket_id};
        navigation.navigate('ViewTicket',{params:param})
    }} />;
  };
  const handleSearch=(txt)=>{
    const filteredData = list2?.filter(item =>
      item?.ticket_no?.toLowerCase().includes(txt.toLowerCase()) 
      || item?.status?.toLowerCase().includes(txt.toLowerCase()) 
      || item?.contact_no?.toLowerCase().includes(txt.toLowerCase()) 
      || item?.seat_number?.toLowerCase().includes(txt.toLowerCase()) 
      || item?.passenger_name?.toLowerCase().includes(txt.toLowerCase()) 
      || item?.passport_number?.toLowerCase().includes(txt.toLowerCase()) 
      || item?.starting_point?.toLowerCase().includes(txt.toLowerCase()) 
      || item?.schedule_date?.toLowerCase().includes(txt.toLowerCase()) 
    );
    setList(filteredData)
    
  }
  return (
    <Screen backButton={true} title={'Tickets'}
    searchbar={true}
    onSearch={(txt)=>{handleSearch(txt)}}
    SearchPlaceHolder={'Search...'}
    >
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={1} // Set number of columns
        contentContainerStyle={styles.container}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 120,
              }}>
              <View style={{alignSelf: 'center', flex: 1, width: 200}}>
                <Ionicons
                  style={{alignSelf: 'center'}}
                  size={50}
                  name="file-tray-outline"
                />
                <TextView
                  style={{alignSelf: 'center', textAlign: 'center'}}
                  text={'No trips available'}
                />
              </View>
            </View>
          );
        }}
      />
      <CustomProgressDialog
        dialogVisible={loading}
        setDialogVisible={setLoading}
      />
    </Screen>
  );
};
export default OldTickets;
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  item: {
    margin: 10,
    backgroundColor: '#FFF',
    borderWidth:0.5,borderColor:Colors.primary,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  h1: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  h2: {
    fontSize: 14,
    color: Colors.light_grey,
  },
  h3: {
    fontSize: 12,
    color: Colors.primary,
    textAlign: 'center',
    marginLeft: 0,
  },
  circle: {
    height: 50,
    width: 50,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: Colors.primary,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view1: {
    width: 150,
  },
  line:{
    borderBottomColor:'#cdcdcd',borderBottomWidth:0.5,paddingVertical:10,
    marginVertical:5
  }
});
