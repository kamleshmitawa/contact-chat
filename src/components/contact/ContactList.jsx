import React, { useEffect, useState } from "react";

export const ContactList = ({ list = [], onContactItemHandler }) => {
  console.log(list, "listlistlistlist");

  return (
    <div class="row contact-list">
      <div class="col-12 contact-sec">
        <div class="panel panel-default">
          <span class="title">Contacts</span>
          <ul class="list-group" id="contact-list">
            {list?.map((contact) => (
              <li class="list-group-item">
                <div class="col-3">
                  <img
                    src={
                      contact?.profileImg ||
                      "https://images.unsplash.com/photo-1498598457418-36ef20772bb9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
                    }
                    alt="profile"
                    class="img-responsive img-circle"
                  />
                </div>
                <div class="col-6 contact-detail"  onClick={(e)=> onContactItemHandler(e, contact)}>
                  <span>{contact?.firstName ?`${contact?.firstName} ${contact?.lastName}`: "Unknown"} </span>
                  <br />
                  <span>{contact.phoneNumber}</span>
                  <br />
                  <span>{contact.time}</span>
                  <br />
                </div>
                <div class="col-3 contact">
                  <a href={`tel:${contact.phoneNumber}`}>
                    <i class="bi bi-telephone"></i>
                  </a>
                  <a href={`mailto:${contact.email}`}>
                    <i class="bi bi-envelope" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
