import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContact } from "../../store/actions/contact";
import { AddContact } from "./AddContact";
import { ContactList } from "./ContactList";
import { Chat } from "../message/Chat";
import "./contact.css";

export const Contact = () => {
  const [contactList, setContactList] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAddContact, setIsAddContact] = useState(false);
  const [isChat, setisChat] = useState(true);
  const [activeChat, setActiveChat] = useState({});

  const { contacts, contactLoading, contactErr } = useSelector(
    ({ contect }) => ({
      contacts: contect.contacts,
      contactLoading: contect.contactLoading,
      contactErr: contect.contactErr,
    })
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getContact(dispatch);
  }, []);

  useEffect(() => {
    setContactList(contacts);
    setLoading(contactLoading);
    setError(contactErr);
    setActiveChat(contacts?.[0]);
  }, [contacts, contactLoading, contactErr]);

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const onAddContactHandler = () => {
    setIsAddContact(true);
    setisChat(false);
  };
  const onContactItemHandler = (e, item) => {
    setActiveChat(item);
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
  };

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
            <button type="button" onClick={onAddContactHandler}>
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
