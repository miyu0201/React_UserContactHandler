import React from "react";
import { Input, Button } from 'reactstrap';
//destructuring these function,  editUserData,handleEditUserChange,handleCancelClick from app.js to repopulate const EditUserRow when any value changes
const EditUserRow = ({
  editUserData,
  handleEditUserChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <Input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="fullName"
          value={editUserData.fullName} //takes in the valur from editUserData in app.js
          onChange={handleEditUserChange}
        ></Input>
      </td>
      <td>
        <Input
          type="text"
          required="required"
          placeholder="Enter an address..."
          name="address"
          value={editUserData.address}
          onChange={handleEditUserChange}
        ></Input>
      </td>
      <td>
        <Input
          type="text"
          required="required"
          placeholder="Enter a company..."
          name="company"
          value={editUserData.company}
          onChange={handleEditUserChange}
        ></Input>
      </td>
      <td>
        <Input
          type="text"
          required="required"
          placeholder="Enter a phone number..."
          name="phoneNumber"
          value={editUserData.phoneNumber}
          onChange={handleEditUserChange}
        ></Input>
      </td>
      <td>
        <Input
          type="email"
          required="required"
          placeholder="Enter an email..."
          name="email"
          value={editUserData.email}
          onChange={handleEditUserChange}
        ></Input>
      </td>
      <td>
        <Button color="success" size="sm" className="mr-2" type="submit">Save</Button>
        <Button size="sm"  type="button" onClick={handleCancelClick}>
          Cancel
        </Button>
      </td>
    </tr>
  );
};

export default EditUserRow;