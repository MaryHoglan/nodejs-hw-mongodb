import express from 'express';

import {
    getContactsController,
    getContactByIdController,
    createContactController,
    updateContactController,
    deleteContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidID.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ContactsSchema, updateContactsSchema } from '../validation/contacts.js';


const router = express.Router();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:id', isValidId, ctrlWrapper(getContactByIdController));
router.post('/', validateBody(ContactsSchema), ctrlWrapper(createContactController));
router.patch('/:id', isValidId, validateBody(updateContactsSchema), ctrlWrapper(updateContactController));
router.delete('/:id', isValidId, ctrlWrapper(deleteContactController));

export default router;