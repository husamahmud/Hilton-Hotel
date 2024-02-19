import { ClubHouseDao } from '../models/dao/clubHouse.dao.js';
import { ClubHouseDto } from '../models/dto/clubHouse.dto.js';
import { ClubHouseValidate } from '../middlewares/validations/clubHouse.validate.js';
import { validateUserId } from '../utilities/Id_validations/users.id.validation.js';

export class ClubHouseController {
  static createClubHouse = async (req, res) => {
    req.body.startTime = new Date(req.body.startTime);
    req.body.endTime = new Date(req.body.endTime);

    const clubHouseDto = new ClubHouseDto(req.body);
    const clubHouseDao = new ClubHouseDao();
  
    try {

      await validateUserId(req.body.userId);

      const { error } = await ClubHouseValidate.createClubHouse(clubHouseDto);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const clubHouse = await clubHouseDao.createClubHouse(clubHouseDto);
      return res.status(200).json({
        message: 'ClubHouse created successfully',
        data: clubHouse,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };

  static getAllClubHouse = async (req, res) => {
    const clubHouseDao = new ClubHouseDao();
    try {
      const clubHouses = await clubHouseDao.getAllClubHouses();
      return res.status(200).json({
        message: 'ClubHouses retrieved successfully',
        data: clubHouses,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };

  static getClubHouseById = async (req, res) => {
    const clubHouseDao = new ClubHouseDao();
    try {
      const clubHouse = await clubHouseDao.getClubHouseById(req.params.clubHouseId);
      return res.status(200).json({
        message: 'ClubHouse retrieved successfully',
        data: clubHouse,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };

  static updateClubHouse = async (req, res) => {
    const clubHouseDto = new ClubHouseDto(req.body);
    const clubHouseDao = new ClubHouseDao();
    clubHouseDto.id = req.params.clubHouseId;

    try {
      await validateUserId(req.body.userId);

      const { error } = await ClubHouseValidate.updateClubHouse(clubHouseDto);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const clubHouse = await clubHouseDao.updateClubHouse(clubHouseDto);
      return res.status(200).json({
        message: 'ClubHouse updated successfully',
        data: clubHouse,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };

  static deleteClubHouse = async (req, res) => {
    const clubHouseDao = new ClubHouseDao();
    try {
      await clubHouseDao.deleteClubHouse(req.params.clubHouseId);
      return res.status(200).json({ message: 'ClubHouse deleted successfully' });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };
}
