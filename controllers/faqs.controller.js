import { FaqsDao } from '../models/dao/faqs.dao.js';
import { FaqsDto } from '../models/dto/faqs.dto.js';
import { FaqsValidate } from '../middlewares/validations/faqs.validate.js';

export class FaqsController {
  static createFaqs = async (req, res) => {
    const faqsDto = new FaqsDto(req.body);
    const faqsDao = new FaqsDao();

    try {
      const { error } = await FaqsValidate.createFaqs(faqsDto);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const faqs = await faqsDao.createFaqs(faqsDto);
      return res.status(200).json({
        message: 'FAQ created successfully',
        data: faqs,
      });
    } catch (e) {
      console.error('Error: ', e.message);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };

  static getAllFaqs = async (req, res) => {
    const faqsDao = new FaqsDao();

    try {
      const faqs = await faqsDao.getAllFaqs();
      return res.status(200).json({
        message: 'FAQs retrieved successfully',
        data: faqs,
      });
    } catch (e) {
      console.error('Error: ', e.message);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };

  static getFaqsById = async (req, res) => {
    const faqsDao = new FaqsDao();

    try {
      const faqs = await faqsDao.getFaqsById(req.params.id);
      return res.status(200).json({
        message: 'FAQ retrieved successfully',
        data: faqs,
      });
    } catch (e) {
      console.error('Error: ', e.message);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };

  static updateFaqs = async (req, res) => {
    const faqsDto = new FaqsDto(req.body);
    const faqsDao = new FaqsDao();
    faqsDto.id = req.params.id;

    try {
      const { error } = await FaqsValidate.updateFaqs(faqsDto);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const faqs = await faqsDao.updateFaqs(faqsDto);
      return res.status(200).json({
        message: 'FAQ updated successfully',
        data: faqs,
      });
    } catch (e) {
      console.error('Error: ', e.message);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };

  static deleteFaqs = async (req, res) => {
    const faqsDao = new FaqsDao();

    try {
      const faqs = await faqsDao.deleteFaqs(req.params.id);
      return res.status(200).json({
        message: 'FAQ deleted successfully',
        data: faqs,
      });
    } catch (e) {
      console.error('Error: ', e.message);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };
}
