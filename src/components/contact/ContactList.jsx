import React, { useEffect, useState } from "react";

export const ContactList = ({ list = [] }) => {
  console.log(list, "listlistlistlist");

  return (
    <ul>
      {list?.map((contact) => (
        <li key={contact.id}> {contact.name}</li>
      ))}
    </ul>
  );
};
