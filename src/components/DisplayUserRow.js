import React from "react";
import {  Button } from 'reactstrap';
// show read only user data in table row, edit button and delete button for each row
//pass in contact, handleEditClick, handleDeleteClick as prop
const DisplayUserRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.fullName}</td>
      <td>{contact.address}</td>
      <td>{contact.company}</td>
      <td>{contact.phoneNumber}</td>
      <td>{contact.email}</td>
      <td>
        <Button color="primary" size="sm" className="me-2"
          type="button"
          onClick={(e) => handleEditClick(e, contact)}//get event and ctact passed in as prop, so we know the contact id
        >
          Edit
        </Button>
        <Button color="danger" size="sm" type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default DisplayUserRow;