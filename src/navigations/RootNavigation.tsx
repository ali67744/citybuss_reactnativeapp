/**
 * @author [Mr.Ali Raza khan]
 * @email [ali67744@gmail.com]
 * @create date 2022-04-28 11:36 AM
 */

 import 'react-native-gesture-handler';
 import type {Node} from 'react';

 import * as React from 'react';
 import {NavigationContainer} from '@react-navigation/native';
 import {
   createStackNavigator,
   TransitionSpecs,
   TransitionPresets,
 } from '@react-navigation/stack';

import MyTabs from './MyTabs';
import LoginScreen from '../screens/LoginScreen';
import Splash from '../screens/Splash';
import Dashboard from '../screens/bottomscreens/Dashboard';
import BookingList from '../screens/bookings/BookingList';
import BookingScreen from '../screens/bookings/BookingScreen';
import ViewTicket from '../screens/ViewTicket';
import Luggage from '../screens/luggage/Luggage';
import LuggageDetail from '../screens/luggage/LuggageDetail';
import SendParcel from '../screens/sendparcel/SendParcel';
import SendParcelDetail from '../screens/sendparcel/SendParcelDetail';
import OldTickets from '../screens/oldtickets/OldTickets';
import CustomerSummaryList from '../screens/customersummary/CustomerSummaryList';





 
 const Stack = createStackNavigator();
//  if (!firebase.apps.length) {
//   firebase.initializeApp(FIREBASE_CONFIG);
// }
 const RootNavigator: () => Node = () => {

   return (
         <Stack.Navigator initialRouteName={'Splash'}>
           <Stack.Screen name="Splash" component={Splash} options={options} />
           <Stack.Screen name="LoginScreen" component={LoginScreen} options={options} />
           <Stack.Screen name="MyTabs" component={MyTabs} options={options} />
           <Stack.Screen name="Dashboard" component={Dashboard} options={options} />
           <Stack.Screen name="BookingList" component={BookingList} options={options} />
           <Stack.Screen name="BookingScreen" component={BookingScreen} options={options} />
           <Stack.Screen name="ViewTicket" component={ViewTicket} options={options} />
           <Stack.Screen name="Luggage" component={Luggage} options={options} />
           <Stack.Screen name="LuggageDetail" component={LuggageDetail} options={options} />
           <Stack.Screen name="SendParcel" component={SendParcel} options={options} />
           <Stack.Screen name="SendParcelDetail" component={SendParcelDetail} options={options} />
           <Stack.Screen name="OldTickets" component={OldTickets} options={options} />
           <Stack.Screen name="CustomerSummaryList" component={CustomerSummaryList} options={options} />
        

         </Stack.Navigator>
   );
 }
 
 const options = () => ({
   headerShown: false,
  //  ...TransitionPresets.SlideFromRightIOS,
  //  transitionSpec: {
  //    open: TransitionSpecs.TransitionIOSSpec,
  //    close: TransitionSpecs.TransitionIOSSpec,
  //  },
 });
 
 export default RootNavigator;
 