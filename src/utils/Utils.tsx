import {PixelRatio,Dimensions} from 'react-native'
const {height, width} = Dimensions.get('window');

export const NumberFormate= /[^a-zA-Z0-9-]/g;
import AsyncStorage from "@react-native-async-storage/async-storage";


export const addQtytoCart = async (item, index,cartProducts,setCartProducts) => {
    const promise=new Promise(async(resolve,reject)=>{
    var newProducts = [...cartProducts];
    newProducts[index] = { ...item, qty: item.qty + 1 }
    setCartProducts([...newProducts]);
    let get = await AsyncStorage.getItem('cart');
    let cart = JSON.parse(get);
    console.log("--->", cart)
    let pusher = [];
    if (cart == null) {
        var changeQty = item;
        changeQty.qty = 1;
        pusher.push(changeQty)
        AsyncStorage.setItem('cart', JSON.stringify(pusher));
        resolve(pusher)
    } else {
        let checker = cart.findIndex(itemm => itemm.id == item.id)
        if (checker == -1) {
            var changeQty = item;
            changeQty.qty = 1;
            pusher = [...cart, changeQty]
            AsyncStorage.setItem('cart', JSON.stringify(pusher));
        resolve(pusher)

        } else {
            let newCart = [...cart];
            newCart[checker] = { ...item, qty: item.qty + 1 }
            AsyncStorage.setItem('cart', JSON.stringify(newCart));
        resolve(pusher)

        }
    }
    
});
return promise;
    
}
export const minusQtytoCart = async (item, index,cartProducts,setCartProducts) => {
    const promise = new Promise(async(resolve,reject)=>{
    if (item.qty > 0) {
        var newProducts = [...cartProducts];
        newProducts[index] = { ...item, qty: item.qty - 1 }
        setCartProducts([...newProducts]);
        let get = await AsyncStorage.getItem('cart');
        let cart = JSON.parse(get);
        console.log("--->", cart)
        if (cart != null) {
            let checker = cart.findIndex(itemm => itemm.id == item.id)
            let newCart = [...cart];
            if (item.qty == 1) {
                newCart.splice(checker, 1)
            } else {
                newCart[checker] = { ...item, qty: item.qty - 1 }
            }
            AsyncStorage.setItem('cart', JSON.stringify(newCart));
            setCartProducts([...newCart]);
            resolve(newCart)

        }else{
            reject()
        }

    }else{
        reject()
    }
});
return promise;
}
export const calculateTotalofCart = (cartProducts) => {
    let total = 0;
    cartProducts.map(item => {
        var makeTotal = Number(Number(item.TP) * Number(item.qty))
        var calculatePercenatge = Number(Number(item.discount) / 100) * Number(makeTotal);
        var discount = Number(makeTotal) - Number(calculatePercenatge);
        total = Number(Number(total) + Number(discount));
    })
    return total.toFixed(2);
}

export const isTablet = () => {
    let pixelDensity = PixelRatio.get();
    const adjustedWidth = width * pixelDensity;
    const adjustedHeight = height * pixelDensity;
    if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
      return true;
    } else
      return (
        pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
      );
  };

  export const Recursion=(arr,length,func)=>{
return new Promise((resolve, reject) =>{
    func(arr[length-1]).then(() =>{
        let next=length-1;
        if(next>0){
            Recursion(arr,next,func)
        }else{
    
            resolve(true)
        }
    }).catch((err) =>{
        reject(err);
    });
   
})
   
  }

  export const generateDatesBetween = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };