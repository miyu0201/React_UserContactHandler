import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import './App.css';
import { Input,Form, Table, Button } from 'reactstrap';

import data from "./mock-user-data.json";
import DisplayUserRow from "./components/DisplayUserRow";
import EditUserRow from "./components/EditUserRow";

const App = () => {
  //set initial state for user, data imported from mock-user-data.json file
  const [contacts, setContacts] = useState(data);

  //for addUser function, initial stats is empty
  const [addUser, setAddUser] = useState({
    fullName: "",
    address: "",
    company: "",
    phoneNumber: "",
    email: "",
  });


  //used for edit button to toggle between editable row and display user row
  //initial value is null, means no user is being edited. If edit button clicked, thhe corresponding user id will be asigned to editUserID
  //if editUserId===contact id, show the corresponding editable row
  const [editUserId, setEditUserId] = useState(null);

  //for editing user data, initial state is empty
  const [editUserData, setEditUserData] = useState({
    fullName: "",
    address: "",
    company:"",
    phoneNumber: "",
    email: "",
  });


  //handle the change of inputfield for adding new user
  const handleAddUserChange = (e) => {
    e.preventDefault();

    const inputName = e.target.getAttribute("name"); //get different inputfield by name
    const inputValue = e.target.value; //get user typed data

    const newUser = { ...addUser }; //use spread operator to copy addUser state value, which is empty for now
    newUser[inputName] = inputValue;//update newUser state with user typed data

    setAddUser(newUser); //update newUser state
  };

  //reset add user table
  const handleAddUserReset = (e) => {
    e.preventDefault();
    document.getElementById("addUserForm").reset();
  };

   //handle submission of new user
   const handleAddUserSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      id: nanoid(),//generate nano id automatically
      fullName: addUser.fullName,
      address: addUser.address,
      company: addUser.company,
      phoneNumber: addUser.phoneNumber,
      email: addUser.email,
    };

    const newContacts = [...contacts, newContact];//use spread operator to conpy current user data for user state, and add newContact object
    setContacts(newContacts);//update contacts state
  }; 

  //used to handle edit button click
  const handleEditClick = (e, contact) => {
    e.preventDefault();
    setEditUserId(contact.id); // If edit button clicked, thhe corresponding user id will be asigned to editUserID

    const inputValues = {
      fullName: contact.fullName,
      address: contact.address,
      company: contact.company,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    };

    setEditUserData(inputValues);//when edit button clicked, get user data from contact, and update editUserData
  };

//used for EditUserRow when edit button clicked
  const handleEditUserChange = (e) => {
    e.preventDefault();

    const inputName = e.target.getAttribute("name");
    const inputValue = e.target.value;

    const newUserData = { ...editUserData };//copy existing user data fron state editUserData, which is existing user data
    newUserData[inputName] = inputValue; //pass in input field name and corresponding value

    setEditUserData(newUserData); //update editUserdata state
  };


//handle save button after editing user data
  const handleEditUserSubmit = (e) => {
    e.preventDefault();

    const editedContact = {
      id: editUserId, //to determine what row we are editing
      fullName: editUserData.fullName,
      address: editUserData.address,
      company: editUserData.company,
      phoneNumber: editUserData.phoneNumber,
      email: editUserData.email,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editUserId);//get the index of the row we are editing by finding the contact id that equal to the editUserId

    newContacts[index] = editedContact; //pass in the value of editedContact to update the newContacts array at the given position

    setContacts(newContacts); //update contacts state
    setEditUserId(null); //reset editUserId to null
  };

  
//handle cancle button, remain user data unchanged
  const handleCancelClick = () => {
    setEditUserId(null); //by setting editUserid to null, it will display user data displayUserRow
  };

  //handle delete button
  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);// according to the index, remove the value at that position, number of value removed is 1

    setContacts(newContacts);
  };

  return (
    <div className="app-container">
      
        <h2>User Contact</h2>
        
      <Form  onSubmit={handleEditUserSubmit}>
        <Table class="table"> 
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Company</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* if editUserId===contact.iD, show the corresponding editable row
             <Fragment> is for a component to return multiple elements.*/}
            {contacts.map((contact) => (
              <Fragment>
                {editUserId === contact.id ? (
                  <EditUserRow
                    editUserData={editUserData}
                    handleEditUserChange={handleEditUserChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  
                  <DisplayUserRow
                    contact={contact} //  takes in {contact} that maped from contacts as contact, to showo existing user data
                    handleEditClick={handleEditClick} 
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </Table>
      </Form>
{/*add new user section */}
      <h3>Add a User</h3>
      <Form id= "addUserForm" onSubmit={handleAddUserSubmit} >
       <Table>
        <tr>
          <td>
        <Input 
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddUserChange}
        /></td>
        <td>
        <Input
          type="text"
          name="address"
          required="required"
          placeholder="Enter an address..."
          onChange={handleAddUserChange}
        /></td>
        <td>
        <Input
          type="text"
          name="company"
          required="required"
          placeholder="Enter a company..."
          onChange={handleAddUserChange}
        /></td>
        <td>
        <Input
          type="text"
          name="phoneNumber"
          required="required"
          placeholder="Enter a phone number..."
          onChange={handleAddUserChange}
        /></td>
        <td>
        <Input
          type="email"
          name="email"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddUserChange}
        /></td>
       </tr>
      </Table>
        <Button color="primary" size="sm" type="submit">Add</Button>
        <Button color="danger" size="sm" type="reset" onClick={handleAddUserReset}>Reset</Button>
      </Form>
      
    </div>
  );
};

export default App;