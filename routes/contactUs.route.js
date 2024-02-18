import express from 'express';
import { ContactUsController } from '../controllers/contactUs.controller.js';

const router = express.Router();

router
    .route('/')
    .post(ContactUsController.createContactUs)
    .get(ContactUsController.getAllContacts);

router
    .route('/:contactId')
    .get(ContactUsController.getContactById)
    .put(ContactUsController.updateContactUs)
    .delete(ContactUsController.deleteContactUs);


export default router;