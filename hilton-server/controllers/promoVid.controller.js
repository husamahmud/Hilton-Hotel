import { PromoVidDto } from '../models/dto/promoVid.dto.js';
import { PromoVidDao } from '../models/dao/promoVid.dao.js';
import { promoVidValidate } from '../middlewares/validations/promoVid.validate.js';
import { validateAdminId } from '../utilities/Id_validations/users.id.validation.js';
import fs from 'fs';
import path from 'path';

export class PromoVidController {
  static createPromoVid = async (req, res) => {
    const promoVidDto = new PromoVidDto(req.body);
    if (req.file) promoVidDto.video = req.file.path;
    const promoVidDao = new PromoVidDao();

    try {
      await validateAdminId(promoVidDto.adminId);
      const { error } = await promoVidValidate.createVid(promoVidDto);
      if (error) return res.status(400).json({ message: error.message });
      const promoVid = await promoVidDao.createPromoVid(promoVidDto);
      return res
        .status(200)
        .json({ message: 'Promo Video created successfully', promoVid });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  static getAllPromoVids = async (req, res) => {
    const promoVidDao = new PromoVidDao();

    try {
      const promoVids = await promoVidDao.getAllPromoVids();
      return res
        .status(200)
        .json({ message: 'Promo Videos Fetched successufully', promoVids });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };

  static getPromoVidById = async (req, res) => {
    const promoVidId = req.params.promoVidId;
    const promoVidDao = new PromoVidDao();

    try {
      const promoVid = await promoVidDao.getPromoVidById(promoVidId);
      if (!promoVid) return res.status(404).json({ message: 'Promo Video not found' });
      return res
        .status(200)
        .json({ message: 'Promo Video Fetched successufully', promoVid });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  static updatePromoVid = async (req, res) => {
    const promoVidDto = new PromoVidDto(req.body);
    promoVidDto.id = req.params.promoVidId;
    if (req.file) promoVidDto.video = req.file.path;
    const promoVidDao = new PromoVidDao();

    try {
      await validateAdminId(promoVidDto.adminId);
      const promoVid = await promoVidDao.getPromoVidById(req.params.promoVidId);
      if (promoVidDto.photo && promoVid.photo) {
        if (fs.existsSync(path.join(__dirname, `../uploads/${promoVid.photo}`))) {
          fs.unlinkSync(path.join(__dirname, `../uploads/${promoVid.photo}`));
        }
      }

      const { error } = await promoVidValidate.updateVid(promoVidDto);
      if (error) return res.status(400).json({ message: error.message });

      const updatedPromoVid = await promoVidDao.updatePromoVid(promoVidDto);
      return res
        .status(200)
        .json({ message: 'Promo Video updated successfully', updatedPromoVid });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  };

  static deletePromoVid = async (req, res) => {
    const promoVidId = req.params.promoVidId;
    const promoVidDao = new PromoVidDao();

    try {
      const promoVid = await promoVidDao.getPromoVidById(promoVidId);
      if (!promoVid) return res.status(404).json({ message: 'Promo Video not found' });
      const deletedPromoVid = await promoVidDao.deletePromoVid(promoVidId);
      return res
        .status(200)
        .json({ message: 'Promo Video deleted successfully', deletedPromoVid });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}
