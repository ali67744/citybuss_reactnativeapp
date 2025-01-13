import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Pressable, Dimensions} from 'react-native';


import {View} from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect, useSelector} from 'react-redux';
import Colors from '../theme/Colors';
import TextView from '../components/TextView';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Dashboard from '../screens/bottomscreens/Dashboard';

const {height, width} = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  const getTabBarVisible = route => {
    const params = route.params;
    if (params) {
      if (params.tabBarVisible === false) {
        return false;
      }
    }
    return true;
  };
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarHideOnKeyboard: true
   }}  
    tabBar={props => <MyCustomTabBar {...props} />}>
      <Tab.Screen
        name="Dashboard"
        options={({route}) => ({
          headerShown: false,
          tabBarVisible: getTabBarVisible(route),
        })}
        component={Dashboard}
      />
      <Tab.Screen
        name="My Listings"
        options={({route}) => ({
          headerShown: false,
          tabBarVisible: getTabBarVisible(route),
        })}
        component={Dashboard}

      />
      <Tab.Screen
        name="Uploading"
        options={({route}) => ({
          headerShown: false,
          tabBarVisible: getTabBarVisible(route),
        })}
        component={Dashboard}

      />
    
    </Tab.Navigator>
  );
};
export default MyTabs;
function MyCustomTabBar({state, descriptors, navigation}) {
  const userInfo = useSelector(state => state.UserDataReducer.UserData);
  const Language = useSelector((state) => state.LanguageReducer);

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#F4AF5F',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 15,
        left: 20,
        right: 20,
        elevation: 10,
        borderRadius: 25,
        backgroundColor: '#FFF',
        height: 60,
        alignSelf: 'center',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (
              route.name === 'Uploading' ||
              route.name === 'Profile' ||
              route.name === 'MarketPlace'
            ) {
              if (userInfo) {
                navigation.navigate(route.name);
              } else {
                navigation.navigate('LoginScreen');
              }
            } else {
              navigation.navigate(route.name);
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            //   style={{ alignItems:"center",backgroundColor:isFocused?color:'#FFF' }}

            style={{
              paddingLeft: '2%',
              paddingRight: '2%',
              //   backgroundColor:isFocused?Colors.primary:'#FFFFFF',
              // height:60,width:'30%',

              borderTopLeftRadius: route.name == 'Dashboard' ? 20 : 0,
              borderBottomLeftRadius: route.name == 'Dashboard' ? 20 : 0,
              borderTopRightRadius: route.name == 'Profile' ? 20 : 0,
              borderBottomRightRadius: route.name == 'Profile' ? 20 : 0,

              justifyContent: 'center',
            }}>
            <View>
              {route.name == 'Dashboard' && (
                <View style={styles.view}>
                  <AntDesign
                    name="home"
                    size={width / 15}
                    color={isFocused ? Colors.primary : '#cdcdcd'}
                  />
                  <TextView
                    text={Language.Home}
                    style={{
                      fontSize: 12,
                      color: isFocused ? Colors.primary : '#cdcdcd',
                    }}
                  />
                </View>
              )}
              {route.name == 'My Listings' && (
                <View style={styles.view}>
                  <Entypo
                    name="list"
                    color={isFocused ? Colors.primary : '#cdcdcd'}
                    size={width / 15}
                  />
                  <TextView
                    text={Language.MyListings}
                    style={{
                      fontSize: 12,
                      color: isFocused ? Colors.primary : '#cdcdcd',
                    }}
                  />
                </View>
              )}
              {route.name == 'Uploading' && (
                <View
                  style={{
                    height: width / 8,
                    width: width / 8,
                    borderRadius: width / 8,
                    marginTop: -30,
                    backgroundColor: '#FFF',
                    elevation: 20,
                    justifyContent: 'center',
                  }}>
                  <Fontisto
                    style={{alignSelf: 'center'}}
                    name="plus-a"
                    size={width / 15}
                    color={isFocused ? Colors.primary : '#cdcdcd'}
                  />
                </View>
              )}
              {route.name == 'MarketPlace' && (
                <View style={styles.view}>
                  <Fontisto
                    name="shopping-store"
                    size={width / 15}
                    color={isFocused ? Colors.primary : '#cdcdcd'}
                  />
                  <TextView
                    text={Language.MarketPlace}
                    style={{
                      fontSize: 12,
                      color: isFocused ? Colors.primary : '#cdcdcd',
                    }}
                  />
                </View>
              )}
              {route.name == 'Profile' && (
                <View style={styles.view}>
                  <FontAwesome
                    name="user-o"
                    size={width / 15}
                    color={isFocused ? Colors.primary : '#cdcdcd'}
                  />
                  <TextView
                    text={Language.Profile}
                    style={{
                      fontSize: 12,
                      color: isFocused ? Colors.primary : '#cdcdcd',
                    }}
                  />
                </View>
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  view: {flexDirection: 'column', alignItems: 'center'},
});
