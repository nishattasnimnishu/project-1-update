/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Modal, View, Text} from 'react-native';
import {AppContext} from '../../context/AppContext';
import Order from '../../components/order';
import Searchbar from '../../components/searchbar';

const Orders = ({navigation}) => {
  const {getOrders, orders, getStaffs} = useContext(AppContext);
  const [order, setOrder] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    getOrders();
    getStaffs();
  }, []);

  useEffect(() => {
    setFilteredOrders(
      orders.filter(orderData => {
        if (orderData.hasOwnProperty('orderId')) {
          return (
            orderData?.userName?.toLowerCase().includes(search.toLowerCase()) ||
            orderData?.orderId.toString().includes(search.toLowerCase()) ||
            orderData?.service?.name
              ?.toLowerCase()
              .includes(search.toLowerCase()) ||
            orderData?.status?.toLowerCase().includes(search.toLowerCase())
          );
        }
      }),
    );
  }, [search, orders]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await getOrders();
    setIsRefreshing(false);
  };
  return (
    <>
      <Modal visible={!!order} animationType="fade">
        <View
          style={{
            width: '100%',
            height: '40%',
            marginTop: '10%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Order
            navigation={navigation}
            order={order}
            setOrder={setOrder}
            showButton={false}
          />
        </View>
      </Modal>
      <FlatList
        ListHeaderComponent={
          orders.length > 0 ? (
            <Searchbar placeholder="Search Order" onChange={setSearch} />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  marginTop: '60%',
                  fontWeight: 'bold',
                  fontSize: 22,
                }}>
                No order found
              </Text>
            </View>
          )
        }
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        data={filteredOrders}
        contentContainerStyle={{
          paddingLeft: 10,
          paddingRight: 10,
          backgroundColor: '#fff',
        }}
        style={{backgroundColor: '#fff'}}
        renderItem={({item}) => <Order setOrder={setOrder} order={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

export default Orders;
