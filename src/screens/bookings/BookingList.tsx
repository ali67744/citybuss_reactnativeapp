import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Text
} from 'react-native';
import Screen from '../../components/Screen';
import TextView from '../../components/TextView';
const DEVICE_WIDTH = Dimensions.get('window').width;
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../theme/Colors';
import {connect, useSelector} from 'react-redux';
import {GetTrips} from '../../apis-auth/apis';
import log from '../../utils/logs';
import CustomProgressDialog from '../../components/CustomProgressDialoge';
import {useNavigation} from '@react-navigation/native';

const ListItem = ({item,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View style={styles.row}>
        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Departure Date'} />
          <TextView style={styles.h2} text={item?.schedule_date} />
        </View>

        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Departure Time'} />
          <TextView style={styles.h2} text={item?.departure_time} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.view1}>
          <TextView style={styles.h1} text={'From'} />
          <TextView style={styles.h2} text={item?.starting_point} />
        </View>

        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Destination'} />
          <TextView style={styles.h2} text={item?.destination} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Bus No'} />
          <TextView style={styles.h2} text={item?.bus_plate_number} />
        </View>

        <View style={styles.view1}>
          <TextView style={styles.h1} text={'Open Seats'} />
          <TextView style={styles.h2} text={item?.open_seats} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const BookingList = ({route}) => {
  let params = route?.params?.params;
  const comeFrom=params;
  log('==>params: ', params);
  const userData = useSelector(state => state.UserDataReducer);
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [activeTabs, setActiveTabs] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigation=useNavigation();

  useEffect(() => {
    getTrips();
  }, [activeTabs]);
  const getTrips = async () => {
    setLoading(true);
    let res = await GetTrips();
    let parser = JSON.parse(res);
    let list=activeTabs==0? parser.botswana: parser.africa
    setList(list);
    setList2(list);
    log("==>reslength",parser);
    setLoading(false);
  };
  const renderItem = ({item}) => {
    return <ListItem item={item} onPress={()=>{
      if(comeFrom==1){

        navigation.navigate('BookingScreen',{params:item})
      }else if(comeFrom==2){
        navigation.navigate('Luggage',{params:item})

      }
    }} />;
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
    <Screen backButton={true} title={'Trips'}
    searchbar={true}
    onSearch={(txt)=>{handleSearch(txt)}}
    SearchPlaceHolder={'Search...'}
    >
        <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTabs === 0 ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTabs(0)}
        >
          <Text
            style={[
              styles.tabText,
              activeTabs === 0 ? styles.activeText : styles.inactiveText,
            ]}
          >
          Botswana
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTabs === 1 ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTabs(1)}
        >
          <Text
            style={[
              styles.tabText,
              activeTabs === 1 ? styles.activeText : styles.inactiveText,
            ]}
          >
            South Africa
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
export default BookingList;
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  item: {
    margin: 10,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    borderWidth:0.5,borderColor:Colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  line:{
    width:1,backgroundColor:"#cdcdcd"
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  activeTab: {
    backgroundColor:Colors.primary,
  },
  inactiveTab: {
    backgroundColor: '#e0e0e0',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
  },
  inactiveText: {
    color: '#333',
  },
});
