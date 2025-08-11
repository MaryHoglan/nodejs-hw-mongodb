import * as fs from "node:fs/promises";
import path from "node:path";

import createHttpError from 'http-errors';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import { getEnvVariable } from "../utils/getEnvVariable.js";

import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact
} from '../services/contacts.js';




//getContacts

export const getContactsController = async (req, res) => {
 
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts(
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    req.user.id,
  );
  
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

//getContactById

export const getContactByIdController = async (req, res) => {
   const contact = await getContactById(req.params.id, req.user.id);
  
  if (!contact) {
    throw  createHttpError(404, 'Contact not found');
  }
    res.json({
      status: 200,
      message: `Successfully found contact with id: ${req.params.id}!`,
      data: contact,
    });
  };

//createContact

export const createContactController = async (req, res) => {
  let photo = null;
  if (getEnvVariable("UPLOAD_TO_CLOUDINARY") === "true") {
    const result = await uploadToCloudinary(req.file.path);
    await fs.unlink(req.file.path);
    
    photo = result.secure_url;
  } else {
    await fs.rename(
      req.file.path,
      path.resolve("src/uploads/photos", req.file.filename),
    );
    photo = `http://localhost:3000/photos/${req.file.filename}`;
  }

  
  
  const contact = await createContact({
    ...req.body,
    photo,
    userId: req.user.id
  });

  res.status(201).json({
    status: 201,
    message: 'Contact created successfully',
    data: contact,
  });

};


//updateContact

export const updateContactController  = async (req, res) => {
  const contact = await updateContact(req.params.id, req.body, req.user.id);
  if (!contact) {
    throw  createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: 'Contact updated successfully',
    data: contact,
  });
};


//deleteContact

export const deleteContactController = async (req, res) => {
  const contact = await deleteContact(req.params.id, req.user.id);

  if (!contact) {
    throw  createHttpError(404, 'Contact not found');
  }
  res.sendStatus(204);
};