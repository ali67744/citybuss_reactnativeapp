let initialState = {
  //Profile Screen -- starts
  Login: 'Login',
  Profile: 'Profile',
  Name: 'Name',
  CNIC: 'CNIC',
  Username: 'Username',
  MobileNumber: 'Mobile Number',
  JoiningDate: 'Joining Date',
  Settings: 'Settings',
  Logout: 'Logout',
  selectLanguage: 'Select Language',

  //Profile Screen -- ends

  //Bottom Tabs starts
  Home: 'Home',
  MyListings: 'My Listings',
  MarketPlace: 'Market Place',
  //Bottom Tabs ends

  // Login Page start

  pleaseSigntocontinue: 'Please sign in to continue',
  email: 'Email',
  password: 'Password',
  donthaveanaccountsignup: "Don't have an account? signup",
  signup: 'Sign up',
  pleaseSignuptocontinue: 'Please signup in to continue',
  typeFullname: 'Full name',
  typeCnic: 'Cnic',
  typeMobile: 'Phone number',
  selectDob: 'Select date of birth',
  alreadyhaveanaccount: 'Already have an account? Login',

  // Login Page end

  //Addmachine start
  addmachine: 'Add Post',
  typeMachineName: 'Enter title',
  typeMachineno: 'Enter mobile number',
  enteramount: 'Enter Amount',
  selectCatgeory: 'Select category',
  description: 'Enter description',
  submit: 'Submit',
  GettingLocation: 'Getting Location',
  pleasewait: 'Please wait...',

  //Addmachine ends

  //   HomeScreen start
  search: 'Search',
  category: 'Categories',
  naerby: 'Near By',
  //   HomeScreen ends

  //Listigs start..
  listings: 'Listings',
  mylistings: 'My Listings',
  myrequests: 'My Request',
  mybookings: 'My Bookings',
  bookings: 'Bookings',
  nolistingsfound: 'No Listings Founded!',
  norequestfound: 'No Request Founded!',
  nobookingfound: 'No Booking Founded!',
  //Listigs ends..

  //   Market place start
  marketPlace: 'Market Place',
  machinary: 'Machinery',
  lands: 'Lands',
  recordnotfound: 'Records not found!',

  //   Market place ends
  //Views starts
  BookingRequest: 'Booking Request',
  Request: 'Request',
  approve: 'Approve',
  reject: 'Reject',
  dateRange: 'Select Date Range for Booking',
  startDate: 'Start Date',
  endDate: 'End Date',
  booknow: 'Book Now!',
  //Views ends

  //Uploading Screen starts
  forSale: 'For Sale',
  forRent: 'For Rent',
  //Uploading Screen ends
};

export default function CartReducer(currentState = initialState, action) {
  switch (action.type) {
    case 'English':
      return {
        //Profile Screen -- starts
        Login: 'Login',
        Profile: 'Profile',
        Name: 'Name',
        CNIC: 'CNIC',
        Username: 'Username',
        MobileNumber: 'Mobile Number',
        JoiningDate: 'Joining Date',
        Settings: 'Settings',
        Logout: 'Logout',
        selectLanguage: 'Select Language',
        //Profile Screen -- ends

        //Bottom Tabs starts
        Home: 'Home',
        MyListings: 'My Listings',
        MarketPlace: 'Market Place',
        //Bottom Tabs ends

        // Login Page start

        pleaseSigntocontinue: 'Please sign in to continue',
        email: 'Email',
        password: 'Password',
        donthaveanaccountsignup: "Don't have an account? signup",
        signup: 'Sign up',
        pleaseSignuptocontinue: 'Please signup in to continue',
        typeFullname: 'Full name',
        typeCnic: 'Cnic',
        typeMobile: 'Phone number',
        selectDob: 'Select date of birth',
        alreadyhaveanaccount: 'Already have an account? Login',

        // Login Page end

        //Addmachine start
        addmachine: 'Add Post',
        typeMachineName: 'Enter title',
        typeMachineno: 'Enter mobile number',
        enteramount: 'Enter Amount',
        selectCatgeory: 'Select category',
        description: 'Enter description',
        submit: 'Submit',
        GettingLocation: 'Getting Location',
        pleasewait: 'Please wait...',
        //Addmachine ends

        //   HomeScreen start
        search: 'Search',
        category: 'Categories',
        naerby: 'Near By',
        //   HomeScreen ends

        //Listigs start..
        listings: 'Listings',
        mylistings: 'My Listings',
        myrequests: 'My Request',
        mybookings: 'My Bookings',
        bookings: 'Bookings',
        nolistingsfound: 'No Records Founded!',
        norequestfound: 'No Request Founded!',
        nobookingfound: 'No Booking Founded!',
        //Listigs ends..

        //   Market place start
        marketPlace: 'Market Place',
        machinary: 'Machinery',
        lands: 'Lands',
        recordnotfound: 'Records not found!',
        //   Market place ends

        //Views starts
        BookingRequest: 'Booking Request',
        Request: 'Request',
        approve: 'Approve',
        reject: 'Reject',
        dateRange: 'Select Date Range for Booking',
        startDate: 'Start Date',
        endDate: 'End Date',
        booknow: 'Book Now!',
        //Views ends

        //Uploading Screen starts
        forSale: 'For Sale',
        forRent: 'For Rent',
        //Uploading Screen ends
      };
    case 'Urdu':
      return {
        //Profile Screen -- starts

        Login: 'لاگ ان',
        Profile: 'پروفائل',
        Name: 'نام',
        CNIC: 'شناختی کارڈ',
        Username: 'صارف نام',
        MobileNumber: 'موبائل نمبر',
        JoiningDate: 'شامل ہونے کی تاریخ',
        Settings: 'ترتیبات',
        Logout: 'لاگ آوٹ',
        selectLanguage: 'زبان منتخب کریں۔',
        //Profile Screen -- starts
        //Bottom Tabs starts
        Home: 'ڈیش بورڈ',
        MyListings: 'میری فہرستیں۔',
        MarketPlace: 'بازار',
        //Bottom Tabs ends

        // Login Page starts
        pleaseSigntocontinue: 'براہ کرم جاری رکھنے کے لیے سائن ان کریں۔',
        email: 'ای میل',
        password: 'پاس ورڈ',
        donthaveanaccountsignup: 'اکاؤنٹ نہیں ہے؟ سائن اپ',
        signup: 'سائن اپ',
        pleaseSignuptocontinue: 'جاری رکھنے کے لیے براہ کرم سائن اپ کریں۔',
        typeFullname: 'پورا نام ٹائپ کریں۔',
        typeCnic: 'شناختی کارڈ ٹائپ کریں۔',
        typeMobile: 'موبائل نمبر ٹائپ کریں۔',
        selectDob: 'تاریخ پیدائش منتخب کریں۔',
        alreadyhaveanaccount: 'پہلے سے ہی اکاؤنٹ ہے؟ لاگ ان کریں',

        // Login Page end

        //Addmachine start
        addmachine: 'پوسٹ شامل کریں۔',
        typeMachineName: 'نام ٹائپ کریں۔',
        typeMachineno: 'موبائل نمبر ٹائپ کریں۔',
        enteramount: 'رقم درج کریں۔',
        selectCatgeory: 'زمرہ منتخب کریں۔',
        description: 'قسم کی تفصیل',
        submit: 'جمع کرائیں',
        GettingLocation: 'مقام حاصل کرنا',
        pleasewait: 'برائے مہربانی انتظار کریں',

        //Addmachine ends
        //   HomeScreen start
        search: 'تلاش کریں۔',
        category: 'اقسام',
        naerby: 'قریب',
        //   HomeScreen ends

        //Listigs start..
        listings: 'فہرستیں',
        mylistings: 'میری فہرستیں۔',
        myrequests: 'میری درخواست',
        mybookings: 'میری بکنگ',
        bookings: 'بکنگ',
        nolistingsfound: 'کوئی فہرستیں قائم نہیں ہوئیں',
        norequestfound: 'کوئی درخواست نہیں ملی',
        nobookingfound: 'کوئی بکنگ نہیں ملی',
        //Listigs ends..

        //   Market place start
        marketPlace: 'بازار',
        machinary: 'مشینری',
        lands: 'زمینیں',
        recordnotfound: 'ریکارڈز نہیں ملے',
        //   Market place ends

        //Views starts
        BookingRequest: 'بکنگ کی درخواست',
        Request: 'درخواست',
        approve: 'منظور کرو',
        reject: 'رد کرنا',
        dateRange: 'بکنگ کے لیے تاریخ کی حد منتخب کریں۔',
        startDate: 'شروع کرنے کی تاریخ',
        endDate: 'آخری تاریخ',
        booknow: 'ابھی بک کرو!',
        //Views ends
        //Uploading Screen starts
        forSale: 'فروخت کے لئے',
        forRent: 'کرایہ کے لئے',
        //Uploading Screen ends
      };

    default:
      return currentState;
  }
}
