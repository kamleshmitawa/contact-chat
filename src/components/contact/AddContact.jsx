import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../store/actions/contact";
import { checkAddContactValidation } from "../../utils";

export const AddContact = () => {
  const [addPayload, setAddPayload] = useState({
    profileImg: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [validObj, setValidObj] = useState({});
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setAddPayload({ ...addPayload, [name]: value });
  };

  const onClearHandler = (e) => {
    e.preventDefault();
    setAddPayload({ profileImg: "",firstName: "", lastName: "", email: "", phoneNumber: "" });
    setValidObj({})
  };

  const onAddContactHandler = (e) => {
    e.preventDefault();
    let valid = checkAddContactValidation(addPayload);
    setValidObj(valid);
    if(valid?.isValid){
      addContact(dispatch, addPayload);
    }
  };

  const { profileImg, firstName, lastName, email, phoneNumber } = addPayload;
  console.log(
    addPayload,
    "addPayloadaddPayload",
    firstName,
    "validObj",
    validObj
  );

  return (
    <div className="add-container">
      <form>
      <label for="profile">Profile</label>
      <input
          type="file"
          id="profile"
          name="profileImg"
          value={profileImg}
          onChange={onChangeHandler}
          placeholder="profile.."
        />
        <br/>
        <label for="fname">First Name*</label>
        <input
          type="text"
          id="fname"
          name="firstName"
          value={firstName}
          onChange={onChangeHandler}
          placeholder="Your name.."
        />
        <div className="error-msg">{validObj["firstName"]}</div>
        <label for="lname">Last Name</label>
        <input
          type="text"
          id="lname"
          name="lastName"
          value={lastName}
          onChange={onChangeHandler}
          placeholder="Your last name.."
        />

        <label for="email">
          <i className="fa fa-envelope"></i> Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={onChangeHandler}
          placeholder="john@example.com"
        />
        <div className="error-msg">{validObj["email"]}</div>

        <label for="phoneNumber">
          <i className="fa fa-phone"></i> Phone Number*
        </label>
        <input
          type="number"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={onChangeHandler}
          placeholder="Phone number"
        />
        <div className="error-msg">{validObj["phoneNumber"]}</div>

        <input type="submit" value="Save" onClick={onAddContactHandler} />
        <input type="button" value="Discard" onClick={onClearHandler} />
      </form>
    </div>
  );
};
