import express from 'express';

import {
    getContactsController,
    getContactByIdController,
    createContactByIdController,
    updateContactController,
    deleteContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:id', ctrlWrapper(getContactByIdController));
router.post('/', ctrlWrapper(createContactByIdController));
router.patch('/:id', ctrlWrapper(updateContactController));
router.delete('/:id', ctrlWrapper(deleteContactController));

export default router;