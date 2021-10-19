import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContact } from "../../store/actions/contact";
import { AddContact } from "./AddContact";
import { ContactList } from "./ContactList";

import './contact.css';

export const Contact = () => {
  const [contactList, setContactList] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAddContact, setIsAddContact] = useState(false);


  const { contacts, contactLoading, contactErr } = useSelector((state) => ({
    contacts: state.contect.contacts,
    contactLoading: state.contect.contactLoading,
    contactErr: state.contect.contactErr,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    getContact(dispatch);
  }, []);

  useEffect(() => {
    setContactList(contacts);
    setLoading(contactLoading);
    setError(contactErr);
  }, [contacts, contactLoading, contactErr]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSearch(value);
  };

  const onAddContactHandler = () => {};

  let filteredContact =
    contactList?.filter((conct) =>
      conct.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const listProps = {
    list: filteredContact,
  };
  console.log(contactList, "contactList", filteredContact);

  if (loading) {
    return <div>Loading......</div>;
  }
  return (
    <div className="container">
      {error ? <div className="error-msg">{error} </div> : <React.Fragment />}
      <div className="row">
        <div className="col-3">
          <div className="row">
            <div>
              <input
                type="text"
                name="search"
                placeholder="search contact"
                autoComplete="off"
                value={search}
                onChange={onChangeHandler}
              />
            </div>
            <div>
              <button type="button" onClick={()=> setIsAddContact(!isAddContact)}>
                Add Contact
              </button>
            </div>
          </div>
          <ContactList {...listProps} />
        </div>
        <div className="col-9">
          {isAddContact && <AddContact />}
        </div>
      </div>
    </div>
  );
};
