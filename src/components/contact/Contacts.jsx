import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContact } from "../../store/actions/contact";
import { AddContact } from "./AddContact";
import { ContactList } from "./ContactList";

import "./contact.css";
import { Chat } from "../message/Chat";

export const Contact = () => {
  const [contactList, setContactList] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAddContact, setIsAddContact] = useState(false);
  const [isChat, setisChat] = useState(true);
  const [activeChat, setActiveChat] = useState({});

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
    setActiveChat(contacts?.[0])
  }, [contacts, contactLoading, contactErr]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSearch(value);
  };

  const onAddContactHandler = () => {
    setIsAddContact(true);
    setisChat(false);
  };
  const onContactItemHandler = (e, item) => {
    setActiveChat(item)
    setIsAddContact(false);
    setisChat(true);
  };

  let filteredContact = search?.length
    ? contactList?.filter((conct) =>
        conct?.firstName?.toLowerCase().includes(search?.toLowerCase())
      )
    : contactList;

  const listProps = {
    list: filteredContact,
    onContactItemHandler,
  };
  const chatProps = {
item: activeChat,

  }
  console.log( "contactList", filteredContact, "search", activeChat);

  if (loading) {
    return <div>Loading......</div>;
  }
  return (
    <div className="container">
      {error ? <div className="error-msg">{error} </div> : <React.Fragment />}
      <div className="row">
        <div className="col-3 search-sec">
          <div className="row search-box">
            <input
              type="text"
              name="search"
              placeholder="search contact"
              autoComplete="off"
              value={search}
              onChange={onChangeHandler}
            />
            <button
              type="button"
              onClick={onAddContactHandler}>
              +
            </button>
          </div>
          <ContactList {...listProps} />
        </div>
        {isAddContact && (
          <div className="col-9 chat-sec">
            <AddContact />
          </div>
        )}
        {isChat && (
          <div className="col-9 chat-sec">
            <Chat {...chatProps} />
          </div>
        )}
      </div>
    </div>
  );
};
