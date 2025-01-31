import {baseUrl} from './BaseUrl';
import {Alert} from 'react-native';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {connect, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Log} from '../components/Log'
import log from '../utils/logs';







export const LoginConnection = async (email, password) => {
  const promise = new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        if (!state.isConnected) {
          Alert.alert('Stop!', 'Please Check your Internet');

          reject();
          return;
        }

        var data = new FormData();
        data.append('username', email);
        data.append('password', password);
        var requestOptions: any = {
          method: 'POST',
          body: data,
          // redirect: 'follow'
        };

        fetch(baseUrl+"login", requestOptions)
          .then(response => response.text())
          .then(result => {
            resolve(result);
          })
          .catch(error => {
            reject(error);
            console.log('error', error);
          });
      })
      .catch(function (error) {
        Alert.alert('Stop!', 'Fetch data Failed!');
        reject();
      });
  });
  return promise;
};
export const GetTrips = async () => {
  const promise = new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        if (!state.isConnected) {
          Alert.alert('Stop!', 'Please Check your Internet');

          reject();
          return;
        }

        var data = new FormData();
        var requestOptions: any = {
          method: 'GET',
          // body: data,
          // redirect: 'follow'
        };

        fetch(baseUrl+"scheduleTripsNewApp", requestOptions)
          .then(response => response.text())
          .then(result => {
            resolve(result);
          })
          .catch(error => {
            reject(error);
            console.log('error', error);
          });
      })
      .catch(function (error) {
        Alert.alert('Stop!', 'Fetch data Failed!');
        reject();
      });
  });
  return promise;
};
export const GetOldBookings = async () => {
  const promise = new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        if (!state.isConnected) {
          Alert.alert('Stop!', 'Please Check your Internet');

          reject();
          return;
        }

        var data = new FormData();
        var requestOptions: any = {
          method: 'GET',
          // body: data,
          // redirect: 'follow'
        };

        fetch(baseUrl+"OldBookings", requestOptions)
          .then(response => response.text())
          .then(result => {
            resolve(result);
          })
          .catch(error => {
            reject(error);
            console.log('error', error);
          });
      })
      .catch(function (error) {
        Alert.alert('Stop!', 'Fetch data Failed!');
        reject();
      });
  });
  return promise;
};
export const GetSeats = async (sch_id) => {
  const promise = new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        if (!state.isConnected) {
          Alert.alert('Stop!', 'Please Check your Internet');

          reject();
          return;
        }

        var data = new FormData();
        data.append('sch_id', sch_id);
        var requestOptions: any = {
          method: 'POST',
          body: data,
          // redirect: 'follow'
        };

        fetch(baseUrl+"seats", requestOptions)
          .then(response => response.text())
          .then(result => {
            resolve(result);
          })
          .catch(error => {
            reject(error);
            console.log('error', error);
          });
      })
      .catch(function (error) {
        Alert.alert('Stop!', 'Fetch data Failed!');
        reject();
      });
  });
  return promise;
};

export const GetTicketInfo = async (id) => {
  const promise = new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        if (!state.isConnected) {
          Alert.alert('Stop!', 'Please Check your Internet');

          reject();
          return;
        }

        var data = new FormData();
        
        var requestOptions:any = {
          method: 'GET',
          // body: data,
        };
        console.log("==> URL",baseUrl+"print_tp_data/"+id)
        fetch(baseUrl+"print_tp_data/"+id, requestOptions)
          .then(response => response.text())
          .then(result => {
            resolve(result);
          })
          .catch(error => {
            reject(error);
            console.log('error', error);
          });
      })
      .catch(function (error) {
        Alert.alert('Stop!', 'Fetch data Failed!');
        reject();
      });
  });
  return promise;
};


export const AddBookingConnection = async (getData) => {
  const promise = new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        if (!state.isConnected) {
          Alert.alert('Stop!', 'Please Check your Internet');

          reject();
          return;
        }

        var data = new FormData();
        data.append('sch_id', getData?.sch_id);
        data.append('passenger_name', getData?.name);
        data.append('passport_number', getData?.passportnumber);
        data.append('contact_no', getData?.contactnumber);
        data.append('op_tn', getData?.optn);
        data.append('pickup_point', getData?.from);
        data.append('destination', getData?.to);
        data.append('seat_number', getData?.seatno);
        data.append('currency', getData?.currency);
        data.append('price', getData?.price);
        data.append('user', getData?.userid);
        data.append('stipend', getData?.stinpend);
        data.append('scurrency', getData?.currency2);
        data.append('depart_time', getData?.departureTime);
        

        console.log(data)

      

        var requestOptions:any = {
          method: 'POST',
          body: data,
          redirect: 'follow',
        };

        fetch(baseUrl+"bookSeat", requestOptions)
          .then(response => response.text())
          .then(result => {
            resolve(JSON.parse(result));
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(function (error) {
        Alert.alert('Stop!', 'Fetch data Failed!');
        reject();
      });
  });
  return promise;
};
export const AddLuggaugeBookingConnection = async (getData,order_no_offline,arr) => {
  const promise = new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        if (!state.isConnected) {
          Alert.alert('Stop!', 'Please Check your Internet');

          reject();
          return;
        }
        let tempObj={
          "passengerName":getData.name,
         "contactNumber": getData?.contactnumber,
         "destinationFrom":getData.from,
         "destinationTo":getData.destination,
          "currency":getData.currency1,
          "currency_2":getData.currency2,
          "price":getData.price1,
          "price_2":getData.price2,
          "sold_by_offline":getData?.user_id,
          "order_no_offline":order_no_offline,
          "booking_date":getData?.schedule_date,
          "travel_schedule":getData?.schedule_id,
          "sold_by":getData?.user_id,
          "dataarray":arr
        }
        let tempArr=[];
        tempArr.push(tempObj)
        var data = new FormData();
        
        data.append('params', JSON.stringify(tempArr));
        
        
        var requestOptions:any = {
          method: 'POST',
          body: data,
          redirect: 'follow',
        };
       
        fetch(baseUrl+"bookLuggage", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log("result",result)
            resolve(JSON.parse(result));
          })
          .catch(error => {
            console.log("error",error)
            reject(error);
          });

      })
      .catch(function (error) {
        Alert.alert('Stop!', 'Fetch data Failed!');
        reject();
      });
      
  });
  return promise;
};

export const SendParcleConnection = async (getData,arr) => {
  const promise = new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        if (!state.isConnected) {
          Alert.alert('Stop!', 'Please Check your Internet');

          reject();
          return;
        }
        let tempObj={
          "fullname":getData?.name,
          "phone":getData?.contactnumber,
          "from":getData?.from,
          "currency":getData?.currency,
          "price":getData?.price,
          "dataarray":arr,
          "user_id":getData?.userid,
        }
        let tempArr=[];
        tempArr.push(tempObj)
        var data = new FormData();
        
        data.append('params', JSON.stringify(tempArr));
        
        
        var requestOptions:any = {
          method: 'POST',
          body: data,
          redirect: 'follow',
        };
       
        fetch(baseUrl+"bookSendReceive", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log("result",result)
            resolve(JSON.parse(result));
          })
          .catch(error => {
            console.log("error",error)
            reject(error);
          });

      })
      .catch(function (error) {
        Alert.alert('Stop!', 'Fetch data Failed!');
        reject();
      });
      
  });
  return promise;
};

export const getSendMoneySummary = async (user_id,user_type) => {
  const promise = new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        if (!state.isConnected) {
          Alert.alert('Stop!', 'Please Check your Internet');

          reject();
          return;
        }
        
        var data = new FormData();
        
        data.append('user_id',user_id );
        data.append('user_type',user_type );
        
        
        var requestOptions:any = {
          method: 'POST',
          body: data,
          redirect: 'follow',
        };
       
        fetch(baseUrl+"SendMoneySummary", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log("result",result)
            resolve(JSON.parse(result));
          })
          .catch(error => {
            console.log("error",error)
            reject(error);
          });

      })
      .catch(function (error) {
        Alert.alert('Stop!', 'Fetch data Failed!');
        reject();
      });
      
  });
  return promise;
};
export const Cashout = async (currency,price,receiver_form_id) => {
  const promise = new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        if (!state.isConnected) {
          Alert.alert('Stop!', 'Please Check your Internet');

          reject();
          return;
        }
        
        var data = new FormData();
        
        data.append('currency',currency );
        data.append('price',price );
        data.append('receiver_form_id',receiver_form_id );
        data.append('price',price );
        
        
        var requestOptions:any = {
          method: 'POST',
          body: data,
          redirect: 'follow',
        };
       
        fetch(baseUrl+"PostPayoutUpdate", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log("result",result)
            resolve(JSON.parse(result));
          })
          .catch(error => {
            console.log("error",error)
            reject(error);
          });

      })
      .catch(function (error) {
        Alert.alert('Stop!', 'Fetch data Failed!');
        reject();
      });
      
  });
  return promise;
};

export const GetTripEarningsByDate = async (user_id,user_type,date,africa=false) => {
  const promise = new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        if (!state.isConnected) {
          Alert.alert('Stop!', 'Please Check your Internet');

          reject();
          return;
        }
        
        var data = new FormData();
        
        data.append('user_id',user_id );
        data.append('user_type',user_type );
        data.append('date',date );

        log("==>data",data)
        
        
        var requestOptions:any = {
          method: 'POST',
          body: data,
          redirect: 'follow',
        };
        const key=africa?'Trip_Earnings_By_DateSA':'Trip_Earnings_By_Date'
        log("==>url",baseUrl+key)
        fetch(baseUrl+key, requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log("result",result)
            resolve(JSON.parse(result));
          })
          .catch(error => {
            console.log("error",error)
            reject(error);
          });

      })
      .catch(function (error) {
        Alert.alert('Stop!', 'Fetch data Failed!');
        reject();
      });
      
  });
  return promise;
};



const postService = (requestOptions) => {
  Log("URL",baseUrl)
  Log("parmas",requestOptions)

  const promise= new Promise((resolve, reject) => {
    NetInfo.fetch()
    .then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (!state.isConnected) {
        Alert.alert('Stop!', 'Please Check your Internet');

        reject("Please Check your Internet");
        return;
      }
      fetch(baseUrl, requestOptions)
          .then(response => response.text())
          .then(result => {
            Log("===?",result)
            var parser=JSON.parse(result)
            resolve(parser);
          })
          .catch(error => {
            reject(error);
            Log('error', error);
          });
    }).catch((error) => {
      reject(error)
      return;
    })
  });
  return promise;
};


