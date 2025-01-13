import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Screen from '../../components/Screen';
import TextView from '../../components/TextView';
const DEVICE_WIDTH = Dimensions.get('window').width;
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../theme/Colors';
import {connect, useSelector} from 'react-redux';
import {getSendMoneySummary,Cashout} from '../../apis-auth/apis';
import log from '../../utils/logs';
import CustomProgressDialog from '../../components/CustomProgressDialoge';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const ListItem = ({item,onCashoutPress,onPrintPress,printShow=false}) => {

  const [loading,setLoading]=useState(false)
  const handleonCashoutPress =async()=>{
    setLoading(true)
    let res=await Cashout(item?.currency,item?.price,item?.sender_form_id)
    log("==> result: " , res)
    Toast.show({type:'success',text1:'Success'})
    setLoading(false)
    let ss = "https://citybuscoaches.com/AppApi/print_sm/" + item?.sender_form_id;
    let param={url:ss,num:"ticket_" + item?.sender_form_id,id:item?.sender_form_id};
    onCashoutPress(param)
    
  }
  return <View style={styles.item}>
      <View style={{margin:20}}>
      <View></View>
      <View style={styles.row}>
        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Date'} />
          <TextView style={styles.h2} text={item?.date} />
        </View>

        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Ticket No'} />
          <TextView style={styles.h2} text={item?.ticket_no} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Sender'} />
          <TextView style={styles.h2} text={item?.sender_name} />
        </View>

        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Receiver'} />
          <TextView style={styles.h2} text={item?.receiver_name} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Receiver Ph#'} />
          <TextView style={styles.h2} text={item?.contact_no} />
        </View>

        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Ticket Amount'} />
          <TextView style={styles.h2} text={item?.price+" "+item?.currency} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Payout Amount'} />
          <TextView style={styles.h2} text={item?.contact_no} />
        </View>

        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Seat No'} />
          <TextView style={styles.h2} text={item?.payout_amount+" "+item?.payout_currency} />
        </View>

        
      </View>

      <View style={styles.row}>
        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Payment Status'} />
          <TextView style={styles.h2} text={item?.payment_status} />
        </View>

        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Status'} />
          <TextView style={styles.h2} text={item?.status} />
        </View>

        
      </View>
    
    </View>
  <View style={styles.bottomBtn}>
        <TouchableOpacity disabled={loading} onPress={handleonCashoutPress} style={[styles.btn,{borderTopLeftRadius:20}]}>
         {loading? <ActivityIndicator color={'#FFF'}/>: <TextView style={styles.h4} text={"Cashout"}/>}
        </TouchableOpacity>
        {printShow && <TouchableOpacity onPress={onPrintPress} style={[styles.btn,{borderTopRightRadius:20}]}>
        <TextView style={styles.h4} text={"Print"}/>
        </TouchableOpacity>}
      </View>

  </View>

  
};
const CustomerSummaryList = ({route}) => {
  let params = route?.params?.params;
  const comeFrom=params;
  const userData = useSelector(state => state.UserDataReducer)?.UserData;
  log('==>paramstyp e: ', userData?.type);
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const navigation=useNavigation();

  useEffect(() => {
    getTrips();
  }, []);
  const getTrips = async () => {
    setLoading(true);
    let res = await getSendMoneySummary(userData?.users_id,userData?.type);
    setList(res?.Sendmoney);
    setList2(res?.Sendmoney);
    // log("==>res",parser?.trip);
    setLoading(false);
  };
  const renderItem = ({item}) => {
    return <ListItem item={item} printShow={Number(userData?.type)<=2}  onCashoutPress={async(param)=>{
     
      navigation.navigate('ViewTicket',{params:param})
      // setLoading2(true)
      
      // let res=await Cashout(item?.currency,item?.price,item?.sender_form_id)
      // log("==> result: " , res)
      // Toast.show({type:'success',text1:'Success'})
      // setLoading2(false)
      // let ss = "https://citybuscoaches.com/AppApi/print_sm/" + item?.sender_form_id;
      // let param={url:ss,num:"ticket_" + item?.sender_form_id,id:item?.sender_form_id};
      // navigation.navigate('ViewTicket',{params:param})

    }}
    onPrintPress={()=>{
      let ss = "https://citybuscoaches.com/AppApi/print_sm/" + item?.sender_form_id;
      let param={url:ss,num:"ticket_" + item?.sender_form_id,id:item?.sender_form_id};
      navigation.navigate('ViewTicket',{params:param})
    }}
    />;
  };
  const handleSearch=(txt)=>{
    const filteredData = list2?.filter(item =>
      item?.bus_plate_number?.toLowerCase().includes(txt.toLowerCase()) 
      || item?.schedule_date?.toLowerCase().includes(txt.toLowerCase()) 
      || item?.starting_point?.toLowerCase().includes(txt.toLowerCase()) 
      || item?.destination?.toLowerCase().includes(txt.toLowerCase()) 
    );
    setList(filteredData)
    
  }
  return (
    <Screen backButton={true} title={'Summary'}
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
export default CustomerSummaryList;
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  item: {
    flex:1,backgroundColor:Colors.white,
      margin:10,
      borderRadius: 10,
      shadowColor: '#000',
    borderWidth:0.5,borderColor:Colors.primary,

      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      height:320,
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
  h4: {
    fontSize: 12,
    color: Colors.white,
    textAlign: 'center',
    padding:4,
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
  btn:
    {flex:1,backgroundColor:Colors.primary,padding:10,justifyContent:'center',alignItems: 'center'}
  ,
  bottomBtn:{
    flexDirection:'row',alignItems:'center',
      justifyContent:'space-between',position:'absolute',
      bottom:0.1}
  
});
