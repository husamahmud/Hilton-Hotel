import { ContactUsDto } from "../models/dto/contactUs.dto.js";
import { ContactUsDao } from "../models/dao/contactUs.dao.js";
import { ContactUsValidate } from "../middlewares/validations/contactUs.validate.js";

export class ContactUsController {

    static createContactUs = async (req, res) => {
        const contactUsDto = new ContactUsDto(req.body);
        const contactUsDao = new ContactUsDao();

        try {
            const { error } = await ContactUsValidate.createContactUs(contactUsDto);
            if (error) return res.status(400).json({ message: error.message });

            const contact = await contactUsDao.createContactUs(contactUsDto);

            return res.status(201).json({ message: "Contact created successfully", data: contact });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static getContactById = async (req, res) => {
        const contactId = req.params.contactId;
        const contactUsDao = new ContactUsDao();

        try {
            const contact = await contactUsDao.getContactById(contactId);
            if (!contact) return res.status(404).json({ message: "Contact not found" });

            return res.status(200).json({ data: contact });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static getAllContacts = async (req, res) => {
        const contactUsDao = new ContactUsDao();

        try {
            const contacts = await contactUsDao.getAllContacts();
            if (!contacts) return res.status(404).json({ message: "No contact found" });

            return res.status(200).json({ data: contacts });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static updateContactUs = async (req, res) => {
        const contactUsDto = new ContactUsDto(req.body);
        const contactUsDao = new ContactUsDao();

        try {
            const { error } = await ContactUsValidate.updateContactUs(contactUsDto);
            if (error) return res.status(400).json({ message: error.message });

            const contact = await contactUsDao.updateContactUs(contactUsDto);

            return res.status(200).json({ message: "Contact updated successfully", data: contact });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static deleteContactUs = async (req, res) => {
        const contactId = req.params.contactId;
        const contactUsDao = new ContactUsDao();

        try {
            const contact = await contactUsDao.deleteContactUs(contactId);
            if (!contact) return res.status(404).json({ message: "Contact not found" });

            return res.status(200).json({ message: "Contact deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

}