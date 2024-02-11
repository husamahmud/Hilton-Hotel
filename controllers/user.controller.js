import { UserDao } from '../models/dao/user.dao.js';
import { UserDto } from '../models/dto/user.dto.js';
import { UserValidate } from '../middlewares/validations/user.validate.js';
import { hashPassword } from '../utilities/password.js';

export class UserController {
  static createUser = async (req, res) => {
    try {
      req.body.password = await hashPassword(req.body.password);
      req.body.birthDate = new Date(req.body.birthDate);

      const userDto = new UserDto(req.body);
      const userDao = new UserDao();

      const { error } = await UserValidate.createUser(userDto);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const user = await userDao.createUser(userDto);
      //TODO sendEmailConfirmation

      return res.status(200).json({
        message: 'User created successfully',
        data: user,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };
}
