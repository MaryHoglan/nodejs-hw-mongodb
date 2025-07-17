import { Contact } from '../models/contact.js';

export async function getAllContacts() {
  return await Contact.find({});
}

export async function getContactById(id) {
  return await Contact.findById(id);
}

export async function createContact(payload) {
  return Contact.create(payload); 
}

export async function updateContact(id, payload) {
  return Contact.findByIdAndUpdate(id, payload, {
    new: true,
  });
}

export async function deleteContact(id) {
  return Contact.findByIdAndDelete(id);
}


