import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Screen from '../../components/Screen';
import TextView from '../../components/TextView';
import CustomDropdown from '../../components/CustomDropdown';
import Colors from '../../theme/Colors';
import log from '../../utils/logs';
import CustomDateTimepicker from '../../components/CustomDateTimepicker';
import SimpleTextInput from '../../components/SimpleTextInput';
import {
  GetSeats,
  AddBookingConnection,
  GetTripEarningsByDate,
} from '../../apis-auth/apis';
import CustomButton from '../../components/CustomButton';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {ScrollView} from 'react-native';
import EarningAdminTables from './components/EarningAdminTables';
import EarningUserTables from './components/EarningUserTables';
import EarningUserTables2 from './components/EarningUserTables2';

const Earnings = ({}) => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.UserDataReducer);
  log('==>params: ', userData);
  const [activeTabs, setActiveTabs] = useState(0);
  const [formData, setFormData] = useState({
    userid: userData?.UserData?.users_id,
    date: moment().format('YYYY-MM-DD'),
    userType: userData?.UserData?.type,
  });
  const [earningsData, setEarningsData] = useState({
    totalPassengerTicketSales: [],
    totalLagguageTicketSales: [],
    PassengerTicketsSoldperUser:[],
    LuggageTicketsSoldperUser:[],

  });
  const [submitLoading, setSubmitLoading] = useState(false);

  const handlebook = async () => {
    if (formData.date == '') {
      Toast.show({type: 'error', text1: 'Please select a date'});
      return;
    } else {
      setSubmitLoading(true);
      let get: any = await GetTripEarningsByDate(
        formData.userid,
        formData.userType,
        formData.date,
        activeTabs==1,
      );
      let totalPassengerTicketSales: any = [];
      if ('t_earnings_n' in get) {
        get?.t_earnings_n?.cur?.map((item, index) => {
          totalPassengerTicketSales.push({
            currency: item,
            total: get?.t_earnings_n?.sum[index],
            stipend: get?.t_earnings_n?.stp[index],
          });
        });
      }
      let totalLagguageTicketSales: any = [];
      if ('l_earnings' in get) {
        get?.l_earnings?.cur?.map((item, index) => {
          totalLagguageTicketSales.push({
            currency: item,
            total: get?.l_earnings?.sum[index],
            stipend: get?.l_earnings?.stp[index],
          });
        });
      }



      log('response', totalPassengerTicketSales);
      log('response', totalLagguageTicketSales);

      setEarningsData({
        ...earningsData,
        totalPassengerTicketSales,
        totalLagguageTicketSales,
        LuggageTicketsSoldperUser:get?.admin_l_earnings,
        PassengerTicketsSoldperUser:get?.admin_t_earnings
      });

      setSubmitLoading(false);
    }
  };
  return (
    <Screen title={'Earnings'} scroll={true} searchbar={false}>
      <View style={styles.space}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTabs === 0 ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => setActiveTabs(0)}>
            <Text
              style={[
                styles.tabText,
                activeTabs === 0 ? styles.activeText : styles.inactiveText,
              ]}>
              Botswana
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTabs === 1 ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => setActiveTabs(1)}>
            <Text
              style={[
                styles.tabText,
                activeTabs === 1 ? styles.activeText : styles.inactiveText,
              ]}>
              South Africa
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <CustomDateTimepicker
            style={{marginTop: 20}}
            title={'Select a date'}
            defaultValue={formData?.date}
            mode={'date'}
            onChange={(v: any) => {
              log('==>v', v);
              setFormData({...formData, date: moment(v).format('YYYY-MM-DD')});
            }}
          />
          <CustomButton
            style={{marginTop: -10}}
            label={'Search'}
            loading={submitLoading}
            onPress={() => {
              handlebook();
            }}
          />

          <View>
            {(formData?.userType == '1' || formData?.userType == '2' ) && (
              <EarningAdminTables
                title="Total Passenger Ticket Sales"
                res={earningsData.totalPassengerTicketSales}
              />
            )}

{(formData?.userType == '1' || formData?.userType == '2' ) &&  (
              <EarningAdminTables
                title="Total Lagguage Ticket Sales"
                res={earningsData.totalLagguageTicketSales}
              />
            )}

<EarningUserTables
                title="Passenger Tickets Sold per User"
                res={earningsData.PassengerTicketsSoldperUser}
              />

<EarningUserTables2
                title="Luggage Tickets Sold per User"
                res={earningsData.LuggageTicketsSoldperUser}
              />
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
};
export default Earnings;
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
    marginVertical: 20,
    marginHorizontal: 20,
  },
  inputView: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 35,
    height: 60,
    marginHorizontal: 10,
    width: '40%',
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 1,
  },

  input: {
    textAlign: 'center',
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
    backgroundColor: Colors.primary,
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
