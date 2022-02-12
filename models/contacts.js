const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const updateFile = async (items) => {
  await fs.writeFile(contactsPath, JSON.stringify(items, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === id);

  if (!contact) {
    return null;
  }

  return contact;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);

  if (idx === -1) {
    return null;
  }

  const deleteContact = contacts[idx];

  contacts.splice(idx, 1);
  await updateFile(contacts);

  return deleteContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();

  const id = (
    Math.max(...contacts.map((contact) => contact.id)) + 1
  ).toString();

  const contact = { id, ...body };

  contacts.push(contact);
  await updateFile(contacts);

  return contact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();

  const idx = contacts.findIndex((item) => item.id === id);

  if (idx === -1) {
    return null;
  }

  contacts[idx] = { ...body, id };

  await updateFile(contacts);

  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
