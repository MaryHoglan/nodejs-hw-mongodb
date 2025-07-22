import createHttpError from 'http-errors';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';


import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact
} from '../services/contacts.js';


export const getContactsController = async (req, res) => {
 
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts(
    page,
    perPage,
    sortBy,
    sortOrder,
    filter);
  
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
   const contact = await getContactById(req.params.id);
  
  if (!contact) {
    throw  createHttpError(404, 'Contact not found');
  }
    res.json({
      status: 200,
      message: `Successfully found contact with id: ${req.params.id}!`,
      data: contact,
    });
  };

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Contact created successfully',
    data: contact,
  });

};




export const updateContactController  = async (req, res) => {
  const contact = await updateContact(req.params.id, req.body);
  if (!contact) {
    throw  createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: 'Contact updated successfully',
    data: contact,
  });
};


export const deleteContactController = async (req, res) => {
  const contact = await deleteContact(req.params.id);

  if (!contact) {
    throw  createHttpError(404, 'Contact not found');
  }
  res.sendStatus(204);
};