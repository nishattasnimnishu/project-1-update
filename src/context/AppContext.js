import React, {createContext, useReducer, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';
import {AsyncStorage} from 'react-native';

import LoadingReducer from './LadingReducer';
import {IS_STARTUP, LOADING, USER_SIGN_IN} from './ReducerConst';
import UserReducer from './UserReducer';
import * as RootNavigation from './../layouts/RootNavigation';

import {
  CATEGORY_COLLECTION,
  ORDER_COLLECTION,
  SERVICE_COLLECTION,
  UP_KEY,
  UPLOAD_URL,
  ADMIN_EMAILS,
  USER_COLLECTION,
  REVIEW_COLLECTION,
} from '../lib/const';
import {createFormData} from '../lib/requests';

const initialState = {
  products: [],
  user: {
    name: '',
    email: '',
    phone: '',
    password: '',
    is_signed_in: false,
  },
  loading: {
    is_loading: false,
    apps_loaded: false,
  },
  categories: [],
  orders: [],
  staffs: [],
};

export const AppContext = createContext(initialState);
export const AppProvider = ({children}) => {
  const [loadingState, dispatchLoading] = useReducer(
    LoadingReducer,
    initialState.loading,
  );
  const [userState, dispatchUser] = useReducer(UserReducer, initialState.user);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [rating, setRating] = useState(0);

  const makeLoading = status => {
    dispatchLoading({
      type: LOADING,
      payload: status,
    });
  };
  const changeUserData = (type, data) => {
    dispatchUser({
      type: type,
      payload: data,
    });
  };
  const submitLogout = async () => {
    await auth()
      .signOut()
      .then(() => {
        dispatchUser({
          type: USER_SIGN_IN,
          payload: false,
        });
      })
      .catch(e => {
        console.log(e);
      });
  };
  const submitLogin = () => {
    makeLoading(true);
    auth()
      .signInWithEmailAndPassword(userState.email, userState.password)
      .then(userCredential => {
        AsyncStorage.setItem('login_email', userState.password.toString()).then(
          r => {
            dispatchUser({
              type: USER_SIGN_IN,
              payload: true,
            });
          },
        );
        makeLoading(false);
      })
      .catch(error => {
        showMessage({
          message: "Email or password doesn't match",
          type: 'danger',
        });
        makeLoading(false);
      });
  };
  const submitRegistration = () => {
    makeLoading(true);
    auth()
      .createUserWithEmailAndPassword(userState.email, userState.password)
      .then(async userCredential => {
        showMessage({
          message: 'Login Successfully done',
          type: 'success',
        });
        auth().currentUser.updateProfile({
          displayName: userState.name,
        });
        //  const confirmation = await auth().verifyPhoneNumber(userState.phone);
        dispatchUser({
          type: USER_SIGN_IN,
          payload: true,
        });
        RootNavigation.navigate('Dashboard');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          showMessage({
            message: 'That email address is already in use!',
            type: 'danger',
          });
          return;
        }

        if (error.code === 'auth/invalid-email') {
          showMessage({
            message: 'That email address is invalid!',
            type: 'danger',
          });
          return;
        }
        showMessage({
          message: 'Something went wrong',
          type: 'danger',
        });
      });
    makeLoading(false);
  };
  const submitStaffRegistration = async (name, email, phone, password) => {
    const user_email_pass = await AsyncStorage.getItem('login_email');
    const user_email = auth().currentUser?.email;
    console.log(user_email_pass, 'user_email_pass');
    makeLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async userCredential => {
        if (user_email_pass && user_email) {
          await auth().signInWithEmailAndPassword(user_email, user_email_pass);
        }
        //add staff to staff collection
        await firestore()
          .collection(USER_COLLECTION)
          .add({
            name: name,
            email: email,
            phone: phone,
            password: password,
            is_staff: true,
          })
          .then(() => {
            getStaffs(false, true);
            showMessage({
              message: 'Staff Register Successfully done',
              type: 'success',
            });
            RootNavigation.goBack();
          })
          .catch(function (error) {
            showMessage({
              message: 'Something went wrong',
              type: 'danger',
            });
          });
      })
      .catch(function (error) {
        if (error.code === 'auth/email-already-in-use') {
          showMessage({
            message: 'That email address is already in use!',
            type: 'danger',
          });
          return;
        }

        if (error.code === 'auth/invalid-email') {
          showMessage({
            message: 'That email address is invalid!',
            type: 'danger',
          });
          return;
        }
        showMessage({
          message: 'Something went wrong',
          type: 'danger',
        });
      });
    makeLoading(false);
  };
  const getProducts = async (loading = true) => {
    if (products.length === 0) {
      makeLoading(loading);
      const response = await firestore().collection(SERVICE_COLLECTION).get();
      const data = response.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setProducts(data);
      makeLoading(false);
    }
  };
  const getOrders = async () => {
    if (auth().currentUser) {
      makeLoading(true);
      if (ADMIN_EMAILS.includes(auth().currentUser?.email)) {
        firestore()
          .collection(ORDER_COLLECTION)
          .orderBy('createdAt', 'desc')
          .onSnapshot(querySnapshot => {
            if (querySnapshot) {
              const data = querySnapshot.docs.map(doc => {
                return {
                  id: doc.id,
                  ...doc.data(),
                };
              });
              setOrders(data);
            }
          });
      } else if (await isStaff()) {
        console.log('staff_email', '==', auth().currentUser?.email);
        firestore()
          .collection(ORDER_COLLECTION)
          .orderBy('createdAt', 'desc')
          .onSnapshot(querySnapshot => {
            if (querySnapshot) {
              const data = querySnapshot.docs.map(doc => {
                return {
                  id: doc.id,
                  ...doc.data(),
                };
              });
              setOrders(
                data.filter(
                  item =>
                    item.staff_email === auth().currentUser?.email ||
                    auth().currentUser?.email === item.userEmail,
                ),
              );
            }
          });
      } else {
        firestore()
          .collection(ORDER_COLLECTION)
          .orderBy('createdAt', 'desc')
          .where('uuid', '==', auth().currentUser?.uid)
          .onSnapshot(querySnapshot => {
            if (querySnapshot) {
              const data = querySnapshot.docs.map(doc => {
                return {
                  id: doc.id,
                  ...doc.data(),
                };
              });
              setOrders(data);
            }
          });
      }
      makeLoading(false);
    }
  };
  const reOrder = order => {
    makeLoading(true);
    firestore()
      .collection(ORDER_COLLECTION)
      .add({
        ...order,
        orderId: new Date().getTime() + new Date().getUTCMilliseconds(),
        status: 'pending',
        createdAt: firestore.Timestamp.now(),
      })
      .then(() => {
        makeLoading(false);
        showMessage({
          message: 'Order placed successfully',
          type: 'success',
        });
      })
      .catch(e => {
        makeLoading(false);
        showMessage({
          message: 'Something went wrong',
          type: 'danger',
        });
      });
  };
  const getCategories = async (loading = true) => {
    if (categories.length === 0) {
      makeLoading(loading);
      const response = await firestore().collection(CATEGORY_COLLECTION).get();
      const data = response.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setCategories(data);
      makeLoading(false);
    }
  };

  const getStaffs = async (loading = true, reSync = false) => {
    if (staffs.length === 0 || reSync) {
      makeLoading(loading);
      const response = await firestore().collection(USER_COLLECTION).get();
      const data = response.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setStaffs(data);
      makeLoading(false);
    }
  };
  const deleteCategory = async category => {
    makeLoading(true);
    const newCategories = categories.filter(item => item.id !== category.id);
    await firestore().collection(CATEGORY_COLLECTION).doc(category.id).delete();
    setCategories(newCategories);
    makeLoading(false);
  };
  const deleteStaff = async staff => {
    makeLoading(true);
    const newStaffs = categories.filter(item => item.id !== staff.id);
    await firestore().collection(USER_COLLECTION).doc(staff.id).delete();
    setStaffs(newStaffs);
    makeLoading(false);
  };
  const deleteService = async service => {
    makeLoading(true);
    const newProducts = products.filter(item => item.id !== service.id);
    await firestore().collection(SERVICE_COLLECTION).doc(service.id).delete();
    setProducts(newProducts);
    makeLoading(false);
  };
  const addService = async (data, service, category, price, description) => {
    makeLoading(true);
    /*check already exist*/
    await firestore()
      .collection(SERVICE_COLLECTION)
      // Filter results
      .where('name', '==', service)
      .get()
      .then(async querySnapshot => {
        if (querySnapshot.size > 0) {
          showMessage({
            message: 'Service already exist',
            type: 'danger',
          });
          makeLoading(false);
        } else {
          await fetch(UPLOAD_URL, data)
            .then(response => response.json())
            .then(async result => {
              await firestore()
                .collection(SERVICE_COLLECTION)
                .add({
                  name: service,
                  image: result.data.media,
                  category_id: category.id,
                  category_name: category.name,
                  price: price,
                  description: description,
                })
                .then(() => {
                  makeLoading(false);
                  showMessage({
                    message: 'Service added successfully',
                    type: 'success',
                  });
                  setProducts([
                    ...products,
                    {
                      name: service,
                      image: result.data.media,
                      category_id: category.id,
                      category_name: category.name,
                      price: price,
                      description: description,
                    },
                  ]);
                })
                .catch(e => {
                  makeLoading(false);
                  showMessage({
                    message: 'Something went wrong',
                    type: 'danger',
                  });
                });
            })
            .catch(error => {
              console.log('error', error);
              showMessage({
                message: 'Something went wrong',
                type: 'danger',
              });
            });
          makeLoading(false);
        }
      });
  };
  const addCategory = async (data, category_name) => {
    makeLoading(true);
    /*check already exist*/
    await firestore()
      .collection(CATEGORY_COLLECTION)
      // Filter results
      .where('name', '==', category_name)
      .get()
      .then(async querySnapshot => {
        if (querySnapshot.size > 0) {
          showMessage({
            message: 'Category already exist',
            type: 'danger',
          });
          makeLoading(false);
        } else {
          await fetch(UPLOAD_URL, data)
            .then(response => response.json())
            .then(async result => {
              await firestore()
                .collection(CATEGORY_COLLECTION)
                .add({
                  name: category_name,
                  image: result.data.media,
                })
                .then(() => {
                  makeLoading(false);
                  showMessage({
                    message: 'Category added successfully',
                    type: 'success',
                  });
                  setCategories([
                    ...categories,
                    {
                      name: category_name,
                      image: result.data.media,
                    },
                  ]);
                })
                .catch(e => {
                  makeLoading(false);
                  showMessage({
                    message: 'Something went wrong',
                    type: 'danger',
                  });
                });
            })
            .catch(error => {
              console.log('error', error);
              showMessage({
                message: 'Something went wrong',
                type: 'danger',
              });
            });
          makeLoading(false);
        }
      });
  };
  const addReview = async (serviceId, rating, userEmail) => {
    makeLoading(true);
    /*check already exist*/
    await firestore()
      .collection(REVIEW_COLLECTION)
      // Filter results
      .where('service_id', '==', serviceId)
      .where('user_email', '==', userEmail)
      .get()
      .then(async querySnapshot => {
        if (querySnapshot.size > 0) {
          showMessage({
            message: 'The user already submitted a review',
            type: 'danger',
          });
          makeLoading(false);
        } else {
          await firestore()
            .collection(REVIEW_COLLECTION)
            .add({
              service_id: serviceId,
              rating: rating,
              user_email: userEmail,
            })
            .then(() => {
              makeLoading(false);
              showMessage({
                message: 'Category added successfully',
                type: 'success',
              });
            })
            .catch(e => {
              makeLoading(false);
              showMessage({
                message: 'Something went wrong',
                type: 'danger',
              });
            });
          makeLoading(false);
        }
      });
  };
  const getReview = async serviceId => {
    makeLoading(true);
    /*check already exist*/
    await firestore()
      .collection(REVIEW_COLLECTION)
      // Filter results
      .where('service_id', '==', serviceId)
      .get()
      .then(async querySnapshot => {
        if (querySnapshot.size > 0) {
          let totalRating = 0;
          querySnapshot.forEach(documentSnapshot => {
            totalRating += documentSnapshot.data().rating;
          });
          setRating(totalRating / querySnapshot.size);
          makeLoading(false);
        } else {
          setRating(0);
          makeLoading(false);
        }
      });
  };
  const updateCategory = async ({name, image, id, wantUpload}) => {
    await firestore()
      .collection(CATEGORY_COLLECTION)
      .where('name', '==', name)
      .get()
      .then(async querySnapshot => {
        if (querySnapshot.size > 1) {
          showMessage({
            message: 'Category already exist',
            type: 'danger',
          });
          makeLoading(false);
        } else {
          makeLoading(true);
          if (wantUpload) {
            await fetch(
              UPLOAD_URL,
              createFormData(wantUpload.assets[0], {
                name: name,
                key: UP_KEY,
              }),
            )
              .then(response => response.json())
              .then(async result => {
                await firestore()
                  .collection(CATEGORY_COLLECTION)
                  .doc(id)
                  .update({
                    name: name,
                    image: result.data.media,
                  })
                  .then(() => {
                    makeLoading(false);
                    showMessage({
                      message: 'Category updated successfully',
                      type: 'success',
                    });
                    const newCategories = categories.map(item => {
                      if (item.id === id) {
                        return {
                          id: id,
                          name: name,
                          image: result.data.media,
                        };
                      } else {
                        return item;
                      }
                    });
                    setCategories(newCategories);
                  })
                  .catch(e => {
                    makeLoading(false);
                    showMessage({
                      message: 'Something went wrong',
                      type: 'danger',
                    });
                  });
              })
              .catch(error => {
                console.log('error', error);
                showMessage({
                  message: 'Something went wrong',
                  type: 'danger',
                });
              });
            makeLoading(false);
          } else {
            await firestore()
              .collection(CATEGORY_COLLECTION)
              .doc(id)
              .update({
                name: name,
              })
              .then(() => {
                makeLoading(false);
                showMessage({
                  message: 'Category updated successfully',
                  type: 'success',
                });
                const newCategories = categories.map(item => {
                  if (item.id === id) {
                    return {
                      id: id,
                      name: name,
                      image: image,
                    };
                  } else {
                    return item;
                  }
                });
                setCategories(newCategories);
              })
              .catch(e => {
                makeLoading(false);
                showMessage({
                  message: 'Something went wrong',
                  type: 'danger',
                });
              });
          }
        }
      });
  };

  const assignStaff = async (staff, order) => {
    await firestore()
      .collection(ORDER_COLLECTION)
      .doc(order?.id)
      .update({
        staff_id: staff.id,
        staff_email: staff.email,
        staff: staff,
      })
      .then(async () => {
        makeLoading(false);
        await getOrders();
        showMessage({
          message: 'Staff assigned successfully',
          type: 'success',
        });
      })
      .catch(e => {
        makeLoading(false);
        showMessage({
          message: 'Something went wrong',
          type: 'danger',
        });
      });
  };

  const updateService = async ({
    name,
    price,
    description,
    image,
    id,
    wantUpload,
  }) => {
    await firestore()
      .collection(SERVICE_COLLECTION)
      .where('name', '==', name)
      .get()
      .then(async querySnapshot => {
        if (querySnapshot.size > 1) {
          showMessage({
            message: 'Service already exist',
            type: 'danger',
          });
          makeLoading(false);
        } else {
          makeLoading(true);
          if (wantUpload) {
            await fetch(
              UPLOAD_URL,
              createFormData(wantUpload.assets[0], {
                name: name,
                key: UP_KEY,
              }),
            )
              .then(response => response.json())
              .then(async result => {
                await firestore()
                  .collection(SERVICE_COLLECTION)
                  .doc(id)
                  .update({
                    name: name,
                    price: price,
                    description: description,
                    image: result.data.media,
                  })
                  .then(() => {
                    makeLoading(false);
                    showMessage({
                      message: 'Service updated successfully',
                      type: 'success',
                    });
                    const newProducts = products.map(item => {
                      if (item.id === id) {
                        return {
                          id: id,
                          name: name,
                          price: price,
                          description: description,
                          image: result.data.media,
                        };
                      } else {
                        return item;
                      }
                    });
                    setProducts(newProducts);
                  })
                  .catch(e => {
                    makeLoading(false);
                    showMessage({
                      message: 'Something went wrong',
                      type: 'danger',
                    });
                  });
              })
              .catch(error => {
                console.log('error', error);
                showMessage({
                  message: 'Something went wrong',
                  type: 'danger',
                });
              });
            makeLoading(false);
          } else {
            await firestore()
              .collection(SERVICE_COLLECTION)
              .doc(id)
              .update({
                name: name,
                price: price,
                description: description,
              })
              .then(() => {
                makeLoading(false);
                showMessage({
                  message: 'Service updated successfully',
                  type: 'success',
                });
                const newProducts = products.map(item => {
                  if (item.id === id) {
                    return {
                      id: id,
                      name: name,
                      image: image,
                      price: price,
                      description: description,
                    };
                  } else {
                    return item;
                  }
                });
                setProducts(newProducts);
              })
              .catch(e => {
                makeLoading(false);
                showMessage({
                  message: 'Something went wrong',
                  type: 'danger',
                });
              });
          }
        }
      });
  };
  const makeOrder = async ({
    uuid,
    userName,
    userEmail,
    phone,
    address,
    service,
  }) => {
    makeLoading(true);
    await firestore()
      .collection(ORDER_COLLECTION)
      .add({
        orderId: new Date().getTime() + new Date().getUTCMilliseconds(),
        uuid: uuid,
        userName: userName,
        userEmail: userEmail,
        phone: phone,
        address: address,
        service: service,
        status: 'pending',
        paymentMethod: 'Cash',
        createdAt: firestore.Timestamp.now(),
      })
      .then(() => {
        makeLoading(false);
        showMessage({
          message: 'Order placed successfully',
          type: 'success',
        });
      })
      .catch(e => {
        makeLoading(false);
        showMessage({
          message: 'Something went wrong',
          type: 'danger',
        });
      });
  };
  const updateOrderStatus = async ({id, status, paymentMethod}) => {
    makeLoading(true);
    await firestore()
      .collection(ORDER_COLLECTION)
      .doc(id)
      .update({
        status: status,
        paymentMethod: paymentMethod,
      })
      .then(() => {
        makeLoading(false);
        showMessage({
          message: 'Order status updated successfully',
          type: 'success',
        });
        const newOrders = orders.map(item => {
          if (item.id === id) {
            return {
              id: id,
              orderId: item.orderId,
              uuid: item.uuid,
              userName: item.userName,
              userEmail: item.userEmail,
              phone: item.phone,
              address: item.address,
              service: item.service,
              status: status,
              createdAt: item.createdAt,
            };
          } else {
            return item;
          }
        });
        setOrders(newOrders);
      })
      .catch(e => {
        console.log('error', e);
        makeLoading(false);
        showMessage({
          message: 'Something went wrong',
          type: 'danger',
        });
      });
  };
  useEffect(() => {
    auth().onAuthStateChanged(async user => {
      await getOrders();
      if (user) {
        dispatchUser({
          type: USER_SIGN_IN,
          payload: true,
        });
      }
      dispatchLoading({
        type: IS_STARTUP,
        payload: true,
      });
    });
  }, []);
  const isStaff = async () => {
    if (staffs.length === 0) {
      await getStaffs();
    }
    return !!staffs.find(item => item.email == auth().currentUser?.email);
  };
  return (
    <AppContext.Provider
      value={{
        loading: loadingState,
        user: userState,
        products: products,
        categories: categories,
        staffs: staffs,
        orders: orders,
        makeLoading,
        changeUserData,
        submitLogin,
        submitRegistration,
        submitStaffRegistration,
        submitLogout,
        getProducts,
        getCategories,
        getOrders,
        addCategory,
        deleteCategory,
        updateCategory,
        addService,
        deleteService,
        updateService,
        makeOrder,
        updateOrderStatus,
        reOrder,
        getStaffs,
        addReview,
        getReview,
        rating,
        assignStaff,
        isStaff,
        deleteStaff
      }}>
      {children}
    </AppContext.Provider>
  );
};
