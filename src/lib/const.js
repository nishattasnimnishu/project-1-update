import {Dimensions} from 'react-native';
const APP_URL = '';
const UPLOAD_URL = 'https://thumbsnap.com/api/upload';
const UP_KEY = '00001f594f4d2a4e7b213aad37bc2597';
const LOGIN_URL = `${APP_URL}/jwt-auth/v1/token`;
const APPS_COLOR = 'red';
const DISPLAY_WIDTH = Dimensions.get('window').width;
const DISPLAY_HEIGHT = Dimensions.get('window').height;
const BANNER = require('./../assets/placeholder-img.jpeg');
const ROW_WIDTH = Math.floor(DISPLAY_WIDTH - DISPLAY_WIDTH / 15);
const MENU_BG_COLOR = '#0F3460';
const BANNER_BG_COLOR = '#9AA8C3';
const TAB_COLOR = '#395589';
const TAB_ACTIVE_COLOR = '#E94560';

const ADMIN_EMAILS = [
  'nishattasnim0899@gmail.com'
];

const PAYMENT_METHODS = [
  {id: 'Cash', name: 'Cash', checked: true},
  {id: 'card', name: 'Card'},
  {id: 'Rocket', name: 'Rocket'},
  {id: 'Upay', name: 'Upay'},
  {id: 'Nagad', name: 'Nagad'},
  {id: 'bKash', name: 'bKash'},
];

const CATEGORY_COLLECTION = 'categories';
const REVIEW_COLLECTION = 'reviews';
const ORDER_COLLECTION = 'orders';
const SERVICE_COLLECTION = 'services';
const USER_COLLECTION = 'users';
const STAFF_COLLECTION = 'staffs';
const DRAWER_HEADER_OPTIONS = {
  headerTintColor: '#fff',
  headerStyle: {backgroundColor: MENU_BG_COLOR},
};

export {
  APPS_COLOR,
  DISPLAY_HEIGHT,
  ROW_WIDTH,
  BANNER,
  LOGIN_URL,
  DRAWER_HEADER_OPTIONS,
  MENU_BG_COLOR,
  BANNER_BG_COLOR,
  TAB_COLOR,
  TAB_ACTIVE_COLOR,
  UPLOAD_URL,
  UP_KEY,
  CATEGORY_COLLECTION,
  SERVICE_COLLECTION,
  ORDER_COLLECTION,
  ADMIN_EMAILS,
  USER_COLLECTION,
  REVIEW_COLLECTION,
  STAFF_COLLECTION,
  PAYMENT_METHODS,
};
