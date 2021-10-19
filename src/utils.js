const validateEmail = (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
};
const validatePhoneNumber = (phone) => {
  let phoneNum = phone.replace(/[^\d]/g, "");
  if (phoneNum.length > 6 && phoneNum.length < 11) {
    return false;
  }
  return true;
};

export const checkAddContactValidation = (data) => {
  const { firstName, email, phoneNumber } = data;
  let validateObj = { isValid: true };

  if (firstName.length < 2) {
    validateObj.firstName = "Please enter first name";
    validateObj.isValid = false;
  } else if (email && !validateEmail(email)) {
    validateObj.email = "Please enter valid email";
    validateObj.isValid = false;
  } else if (validatePhoneNumber(phoneNumber)) {
    validateObj.phoneNumber = "phone number should be 10 digit";
    validateObj.isValid = false;
  }

  return validateObj;
};
