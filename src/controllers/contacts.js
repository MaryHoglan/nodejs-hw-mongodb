import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact
} from '../services/contacts.js';


export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
   const contact = await getContactById(req.params.id);
  
  if (!contact) {
    throw createHttpError('Contact not found');
  }
    res.json({
      status: 200,
      message: `Successfully found contact with id: ${req.params.id}!`,
      data: contact,
    });
  };

export const createContactByIdController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Student created successfully',
    data: contact,
  });

};


export const deleteContactController = async (req, res) => {
  const contact = await deleteContact(req.params.id);

  if (!contact) {
    throw createHttpError('Contact not found');
  }
  res.json({
    status: 200,
    message: 'Contact deleted successfully'
  });
};

export const updateContactController  = async (req, res) => {
  const contact = await updateContact(req.params.id, req.body);
  if (!contact) {
    throw new createHttpError.NotFound('Contact not found');
  }
  res.json({
    status: 200,
    message: 'Contact updated successfully',
    data: contact,
  });
};
