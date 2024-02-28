/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppContext} from '../context/AppContext';
import {ADMIN_EMAILS, PAYMENT_METHODS} from '../lib/const';
import Select2 from 'react-select2-native';

const Order = ({order, navigation, setOrder, showButton = true}) => {
  const userEmail = auth()?.currentUser ? auth().currentUser.email : '';
  const {updateOrderStatus, reOrder, staffs, assignStaff} =
    useContext(AppContext);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const statusColor = {
    pending: 'lightblue',
    complete: 'green',
    cancel: 'red',
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff', marginTop: 10}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '80%',
          marginLeft: '5%',
        }}>
        <Text style={{fontSize: 16, flex: 1, color: '#000'}}>#Order</Text>
        <View style={{flex: 2}}>
          <Text style={{fontSize: 16, flex: 1, color: '#000'}}>
            {order.orderId}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '80%',
          marginLeft: '5%',
        }}>
        <Text style={{fontSize: 16, flex: 1, color: '#000'}}>Service</Text>
        <View style={{flex: 2}}>
          <Text style={{fontSize: 16, flex: 1, color: '#000'}}>
            {order?.service?.name}s
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '80%',
          marginLeft: '5%',
        }}>
        <Text style={{fontSize: 16, flex: 1, color: '#000'}}>Date:</Text>
        <View style={{flex: 2}}>
          <Text style={{color: '#000'}}>
            {new Date(order.createdAt.toDate()).toDateString()}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '80%',
          marginLeft: '5%',
        }}>
        <Text style={{fontSize: 16, flex: 1, color: '#000'}}>Status:</Text>
        <View style={{flex: 2}}>
          <Text
            style={{
              fontSize: 12,
              backgroundColor: statusColor[order.status],
              width: '40%',
              textAlign: 'center',
              borderRadius: 5,
              fontWeight: 'bold',
              textTransform: 'capitalize',
              color: '#fff',
            }}>
            {order.status}
          </Text>
        </View>
      </View>

      {!showButton && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '80%',
            marginLeft: '5%',
          }}>
          <Text style={{fontSize: 16, flex: 1, color: '#000'}}>User:</Text>
          <View style={{flex: 2}}>
            <Text style={{color: '#000'}}>
              {order.userName}, {order.phone}, {order.userEmail}
            </Text>
          </View>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '80%',
          marginLeft: '5%',
        }}>
        <Text style={{fontSize: 16, flex: 1, color: '#000'}}>Address:</Text>
        <View style={{flex: 2}}>
          <Text style={{color: '#000'}}>{order.address}</Text>
        </View>
      </View>
      {order?.staff_email && (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '80%',
              marginLeft: '5%',
            }}>
            <Text style={{fontSize: 16, flex: 1, color: '#000'}}>
              Staff Name:
            </Text>
            <View style={{flex: 2}}>
              <Text style={{color: '#000', textTransform: 'capitalize'}}>
                {order?.staff?.name}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '80%',
              marginLeft: '5%',
            }}>
            <Text style={{fontSize: 16, flex: 1, color: '#000'}}>
              Staff Email:
            </Text>
            <View style={{flex: 2}}>
              <Text style={{color: '#000'}}>{order?.staff_email}</Text>
            </View>
          </View>
        </>
      )}
      {!showButton && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '80%',
            marginLeft: '5%',
          }}>
          <Text style={{fontSize: 16, flex: 1, color: '#000'}}>Price:</Text>
          <View style={{flex: 2}}>
            <Text style={{color: '#000'}}>{order.service?.price}</Text>
          </View>
        </View>
      )}
      <>
        {order?.status === 'complete' && order?.paymentMethod && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '80%',
              marginLeft: '5%',
            }}>
            <Text style={{fontSize: 16, flex: 1, color: '#000'}}>
              Payment Method:
            </Text>
            <View style={{flex: 2}}>
              <Text style={{color: '#000'}}>{order.paymentMethod}</Text>
            </View>
          </View>
        )}
      </>

      {showButton ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            margin: 5,
            borderWidth: 1,
            borderColor: '#0F3460',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}>
          <IconText
            Type={Ionicons}
            icon={'document-text-outline'}
            color={'#0F3460'}
            text={'View Details'}
            onPress={() => {
              setOrder(order);
            }}
            style={{borderRightWidth: 1, borderColor: '#0F3460'}}
          />
          <IconText
            Type={Ionicons}
            icon={'md-reload-sharp'}
            onPress={() => {
              reOrder(order);
            }}
            color={'#D23F57'}
            text={'Re-Order'}
          />
        </View>
      ) : (
        <>
          <View
            style={{
              margin: 10,
            }}>
            {order.status === 'pending' && ADMIN_EMAILS.includes(userEmail) && (
              <>
                <Select2
                  isSelectSingle
                  style={{borderRadius: 5}}
                  colorTheme="blue"
                  popupTitle="Select Staff"
                  title="Staffs"
                  data={staffs}
                  onSelect={data => {
                    staffs.find(item => {
                      if (item.id === data.find(() => true)) {
                        setSelectedStaff(item);
                      }
                    });
                  }}
                />
                <TouchableOpacity
                  style={{backgroundColor: 'green', marginBottom: 10}}
                  onPress={async () => {
                    await assignStaff(selectedStaff, order);
                    setSelectedStaff(null);
                    setOrder(null);
                  }}>
                  <Text
                    style={{color: '#fff', padding: 10, textAlign: 'center'}}>
                    Assign Staff
                  </Text>
                </TouchableOpacity>
                <Text style={{color: '#000', padding: 10, paddingLeft: 0}}>
                  Payment Method
                </Text>
                <Select2
                  isSelectSingle
                  style={{borderRadius: 5}}
                  colorTheme="blue"
                  popupTitle="Select Payment Method"
                  title="Payment Method"
                  data={PAYMENT_METHODS}
                  onSelect={data => {
                    setPaymentMethod(data[0]);
                  }}
                />
              </>
            )}
          </View>
          {order.status === 'pending' && userEmail === order?.staff_email && (
            <View>
              <Text
                style={{
                  color: '#000',
                  padding: 10,
                  paddingLeft: 0,
                  marginLeft: 10,
                }}>
                Payment Method
              </Text>
              <Select2
                isSelectSingle
                style={{borderRadius: 5, marginLeft: 10, marginRight: 10}}
                colorTheme="blue"
                popupTitle="Select Payment Method"
                title="Payment Method"
                data={PAYMENT_METHODS}
                onSelect={data => {
                  setPaymentMethod(data[0]);
                }}
              />
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 20,
            }}>
            {order.status === 'pending' &&
              (ADMIN_EMAILS.includes(userEmail) ||
                userEmail == order?.staff_email) && (
                <>
                  <TouchableOpacity
                    style={{backgroundColor: 'green', marginBottom: 10}}
                    onPress={() => {
                      setOrder(null);
                      updateOrderStatus({
                        id: order.id,
                        status: 'complete',
                        paymentMethod: paymentMethod,
                      });
                    }}>
                    <Text
                      style={{color: '#fff', padding: 10, textAlign: 'center'}}>
                      Complete
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{backgroundColor: 'red', marginBottom: 10}}
                    onPress={() => {
                      setOrder(null);
                      updateOrderStatus({
                        id: order.id,
                        status: 'cancel',
                      });
                    }}>
                    <Text
                      style={{color: '#fff', padding: 10, textAlign: 'center'}}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            <TouchableOpacity
              style={{backgroundColor: 'blue', marginBottom: 10}}
              onPress={() => setOrder(null)}>
              <Text style={{color: '#fff', padding: 10, textAlign: 'center'}}>
                Close
              </Text>
            </TouchableOpacity>
            {order.status === 'complete' && order.userEmail == userEmail && (
              <TouchableOpacity
                style={{backgroundColor: 'green', marginBottom: 10}}
                onPress={() => {
                  setOrder(null);
                  navigation.navigate('Review', {order});
                }}>
                <Text style={{color: '#fff', padding: 10, textAlign: 'center'}}>
                  Review
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const IconText = ({Type, icon, text, color, onPress, style = {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'center',
        padding: 5,
        alignItems: 'center',
        ...style,
      }}>
      <Type color={color} name={icon} size={25} />
      <Text style={{color: color, marginLeft: 2}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Order;
