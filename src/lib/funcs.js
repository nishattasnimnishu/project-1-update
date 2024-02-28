import {toast} from 'react-toastify';
import {confirmAlert} from 'react-confirm-alert';

const addErrorToast = error => {
  toast.error(error, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
const addSuccessToast = msg => {
  toast.success(msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
const requestCallback = (success, message) => {
  if (success) {
    addSuccessToast(message);
  } else {
    if (typeof message === 'object' && message !== null) {
      for (var key in message) {
        if (message.hasOwnProperty(key)) {
          if (Array.isArray(message[key])) {
            addErrorToast(message[key][0]);
          } else {
            addErrorToast(message[key]);
          }
        }
      }
    }
  }
};
const validateRegister = (name, email, password, confirmPassword, validate) => {
  let valid = true;
  if (!name.length) {
    valid = false;
    addErrorToast('Name is invalid');
  }
  if (!validateEmail(email)) {
    valid = false;
    addErrorToast('Email is invalid');
  }
  if (password.length < 6) {
    valid = false;
    addErrorToast('Password length must be at least 6 character');
  }
  if (confirmPassword !== password) {
    valid = false;
    addErrorToast("Confirm password doesn't match");
  }

  validate(valid);
};
const validateEmail = email => {
  const regExp = /\S+@\S+\.\S+/;
  return regExp.test(email);
};
const deleteProduct = (removeProduct, productId, token, idRemoved) => {
  confirmAlert({
    title: 'Confirm to delete',
    message: 'Are you sure to delete this.',
    buttons: [
      {
        label: 'Yes',
        onClick: () =>
          removeProduct(productId, token, (deleted, message) => {
            idRemoved(deleted);
            requestCallback(deleted, message);
          }),
      },
      {
        label: 'No',
        onClick: () => {
          console.log('Delete Canceled');
        },
      },
    ],
  });
};
export {
  addErrorToast,
  addSuccessToast,
  requestCallback,
  deleteProduct,
  validateRegister,
};
