import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import log from '../utils/logs';
import Screen from '../components/Screen';
import {GetTicketInfo} from '../apis-auth/apis';
import RNFetchBlob from 'rn-fetch-blob';
import TextView from '../components/TextView';
import Toast from 'react-native-toast-message';
import Share from 'react-native-share';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPrint from 'react-native-print';
import CustomDialoge from '../components/CustomDialoge';
import CustomButton from '../components/CustomButton';
import Colors from '../theme/Colors';
import { useSelector } from 'react-redux';
const ViewTicket = ({route}) => {
  let params = route?.params?.params;
  const comeFrom=route?.params?.comeFrom;
  log('==>comeFrom: ', comeFrom);
  log('==>params', params);
  let shareText = '';
  const webViewRef = useRef(null);
  const [showDialoge,setShowDialoge] =useState(false);
  const [customerWhatsappNumber,setCustomerWhatsappnumber] =useState("");
  const userData = useSelector(state => state.UserDataReducer)?.UserData;
  log('==>userData', userData);
  const viewPrint= comeFrom=='old_booking' ? userData?.type=='1' :true;

  useEffect(() => {
    getInfo();
  });

  const getInfo = async () => {
    let res = await GetTicketInfo(params?.id);
    log('==>res', res);
    try {
      const json = JSON.parse(res);
      const dataArray = json.data;

      dataArray.forEach(item => {
        shareText = `*Coach Number*: ${item?.bus_plate_number} \n\n
      *Created at*: ${item?.created_at} \n\n
      *Cashier*: ${item?.full_name} \n\n
      *Ticket Number*: ${item?.ticket_no} \n\n
      *Seat Number*: ${item?.seat_number} \n\n
      *Passenger Name*: ${item?.passenger_name} \n\n
      *Passport*: ${item?.passport_number} \n\n
      *Contact Number*: ${item?.contact_no} \n\n
      *OPTN Number*: ${item?.op_tn} \n\n
      *FROM*: ${item?.pickup_point} \n\n
      *To*: ${item?.destination} \n\n
      *Departure Date*: ${item?.date} \n\n
      *Price*: ${item?.price}${item?.currency} \n\n\n\n
      *Terms and Conditions*: ${json?.terms_n_conditions} \n\n\n\n\n*PLEASE JOIN OUR WHATSAPP COMMUNITY VIA THIS LINK* \nhttps://whatsapp.com/channel/0029VanYiYAG3R3cXYpaRc18`;

        // console.log("ShareText", shareText);
      });
    } catch (error) {
      console.error('Error parsing JSON: ', error);
    }
  };
  const sendWhatsAppMessage = () => {
    setShowDialoge(true)
  };
  const downloadAndOpenPDF = async () => {
    const url = 'https://citybuscoaches.com/AppApi/download_pdf/' + params?.id;
    log('==>download', url);
    const fileName = 'citybussticket.pdf';

    try {
      // Request permissions on Android
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download and open files.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Denied',
            'Storage permission is required to download the file.',
          );
          return;
        }
      }

      // Define the file path
      const {dirs} = RNFetchBlob.fs;
      const filePath =
        Platform.OS === 'android'
          ? `${dirs.DownloadDir}/${fileName}` // Android: Downloads folder
          : `${dirs.DocumentDir}/${fileName}`; // iOS: App's Documents folder

      // Start downloading the file
      const res = await RNFetchBlob.config({
        path: filePath, // Set the file path
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: filePath,
          description: 'Downloading PDF...',
        },
      }).fetch('GET', url);

      const downloadedFilePath = res.path();
      // Share the file
      const options = {
        title: 'Share PDF File',
        url: `file://${downloadedFilePath}`,
        type: 'application/pdf', // Specify the file MIME type
        message: 'Check out this document!',
      };

      await Share.open(options);
      return;
      // Alert.alert('Success', `File downloaded to: ${downloadedFilePath}`);
      Toast.show({type: 'success', text1: 'Downloaded PDF successfully'});

      // Open the file after downloading
      if (Platform.OS === 'android') {
        RNFetchBlob.android.actionViewIntent(
          downloadedFilePath,
          'application/pdf',
        );
      } else {
        RNFetchBlob.ios.previewDocument(downloadedFilePath);
      }
    } catch (error) {}
  };
  const print=async()=>{
    if (webViewRef.current) {
      // Get the URL of the webpage loaded in the WebView
      const url = params?.url

      // Print the webpage
      await RNPrint.print({ html: `<iframe src="${url}" style="width: 100%; height: 100%"></iframe>` });
    }
  }
  return (
    <Screen searchbar={false}>
      <View style={styles.container}>
        <WebView ref={webViewRef} source={{uri: params?.url}} style={{flex: 1}} />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 1,right:10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity style={styles.shareBtn} onPress={downloadAndOpenPDF}>
          <Ionicons name='share-social' size={20}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareBtn} onPress={sendWhatsAppMessage}>
          <Ionicons name='logo-whatsapp' size={20}/>
        </TouchableOpacity>
        {
      viewPrint
         && <TouchableOpacity style={styles.shareBtn} onPress={()=>print()}>
          <Ionicons name='print-outline' size={20}/>
        </TouchableOpacity>}
      </View>
      <CustomDialoge style={{flex:1}}  dialogVisible={showDialoge} setDialogVisible={setShowDialoge}>
        <View style={{marginTop:40}}>
        <TextView text={"Enter Whatsapp Number"}/>
        <TextInput style={styles.input}
        keyboardType={'decimal-pad'} 
        value={customerWhatsappNumber}
        onChangeText={(v)=>{

          setCustomerWhatsappnumber(v)
        }}
        placeholder='+1 (432) 65555'/>
        <TouchableOpacity 
         onPress={() => {
          if(customerWhatsappNumber==''){
            const phoneRegex = /^[0-9]{10}$/; 
            if (!phoneRegex.test(customerWhatsappNumber)) {
              Toast.show({type: 'error', text1:'Please enter valid phone number'})
            return
          }
          Toast.show({type: 'error', text1:'Please enter valid phone number'})

          return
        }
          const url = `https://api.whatsapp.com/send?phone=${customerWhatsappNumber}&text=${encodeURIComponent(
            shareText,
          )}`;
          Linking.openURL(url).catch(err =>
            console.error('Error opening WhatsApp: ', err),
          );
        }}
        style={{height:30,
        width:200,borderRadius:5,borderWidth:0.5,alignSelf:'center',
        marginTop:20,
        borderColor:Colors.primary,justifyContent: 'center',alignItems:'center',
        }}>
          <TextView style={{color:Colors.primary}} text={"Share on Whatsapp"}/>

        </TouchableOpacity>
        </View>
      </CustomDialoge>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shareBtn:{
    height:50,width:50,justifyContent:'center',marginBottom: 20,
    borderRadius:50,padding:10,flexDirection: 'row',alignItems:'center',
    backgroundColor:'#cdcdcd'+20,marginHorizontal:10
  },
  input:{
    height:40,borderRadius:10,borderWidth:0.5,borderColor:'#cdcdcdcd',
    paddingHorizontal:10,marginTop:10,
  }
});

export default ViewTicket;
