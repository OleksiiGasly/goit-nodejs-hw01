const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs').promises;

const contactsPath = path.resolve('./db/contacts.json');

fs.readFile(contactsPath, 'utf8', (error, data) => {
  if (error) {
    console.log(error)
    return
  }
  const jsonParse = JSON.parse(data)
  console.log(jsonParse)
})

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8') 
    return JSON.parse(contacts);
  } catch (error){
    console.error(error);      
    }
}

const getContactById = async (id) => {
    try {
        const contacts = await listContacts();
        const result = contacts.find(contact => contact.id === Number(id))
        return result;
    }
    catch (error) {
    console.error(error);
    }
}
  
const removeContact = async (id) => {
    try {
        const contact = await listContacts();
        const updContactList = contact.filter(contact => contact.id !== Number(id))
        await fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2))
        return updContactList;
  }
  catch (error) {
    console.error(error)
  }
}

const addContact = async (name, email, phone) => {
  const newContact = { id: uuidv4(), name, email, phone }
  try {
    const findContacts = await fs.readFile(contactsPath, 'utf8')
    const parseContacts = JSON.parse(findContacts);
    const updContactList = [...parseContacts, newContact]
    await fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2), 'utf8');
    return updContactList;
  }
  catch (error) {
    console.error(error)
  }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};