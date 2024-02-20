import { NewsDto } from '../models/dto/news.dto.js';
import { NewsDao } from '../models/dao/news.dao.js';
import { NewsValidate } from '../middlewares/validations/news.validate.js';
import { validateAdminId } from '../utilities/Id_validations/users.id.validation.js';
import fs from 'fs';
import path from 'path';

export class NewsController {
  static createNews = async (req, res) => {
    const newsDto = new NewsDto(req.body);
    const newsDao = new NewsDao();

    try {

      await validateAdminId(req.body.adminId); // TODO - req.user

      const { error } = await NewsValidate.createNews(newsDto);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const news = await newsDao.createNews(newsDto);
      return res
        .status(201)
        .json({ message: 'News created successfully', data: news });

    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };

  static getAllNews = async (req, res) => {
    const newsDao = new NewsDao();

    try {
      const news = await newsDao.getAllNews();
      return res.status(200).json({ data: news });

    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };

  static getNewsById = async (req, res) => {
    const newsDao = new NewsDao();

    try {
      const news = await newsDao.getNewsById(req.params.newsId);
      return res
        .status(200)
        .json({ message: 'News retrived successfully', data: news });

    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };

  static getNewsByAdminId = async (req, res) => {
    const newsDao = new NewsDao();

    try {

      await validateAdminId(req.params.adminId);

      const news = await newsDao.getNewsByAdminId(req.params.adminId);
      return res
        .status(200)
        .json({ message: 'News retrived successfully', data: news });

    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };

  static deleteById = async (req, res) => {
    const { newsId } = req.params;
    const newsDao = new NewsDao();

    try {
      const news = await newsDao.deleteNews(newsId);
      return res
        .status(200)
        .json({ message: 'News deleted successfully', data: news });

    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };

  static updateNews = async (req, res) => {
    const newsDto = new NewsDto(req.body);
    const newsDao = new NewsDao();
    newsDto.id = req.params.newsId;

    if (req.files) newsDto.images = req.files.map(img => img.path);

    try {

        await validateAdminId(req.body.adminId); // TODO - req.user

        const news = await newsDao.getNewsById(req.params.newsId);

        if (news.images && newsDto.images) {
            news.images.forEach(img => {
                if (fs.existsSync(path.join(__dirname, `../uploads/${img}`))) {
                    fs.unlinkSync(path.join(__dirname, `../uploads/${img}`));
                }
            })
        }


        const { error } = await NewsValidate.updateNews(newsDto);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const updatedNews = await newsDao.updateNews(newsDto);
        return res
          .status(200)
          .json({ message: 'News updated successfully', data: updatedNews });

    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };
}
