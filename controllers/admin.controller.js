import { AdminDao } from "../models/dao/admin.dao.js";
import { AdminDto } from "../models/dto/admin.dto.js";
import { AdminValidation } from "../middlewares/validations/admin.validate.js";
import { hashPassword } from "../utilities/password.js";

export class AdminController {
  // TODO multer
  static createAdmin = async (req, res) => {
    req.body.password = await hashPassword(req.body.password);
		req.body.birthDate = new Date(req.body.birthDate)
    const adminDto = new AdminDto(req.body);
    console.log(adminDto)

    const adminDao = new AdminDao();

    try {
      const { error } = await AdminValidation.createAdmin(adminDto);

      if (error)
        return res.status(400).json({ message: error.details[0].message });

      const admin = await adminDao.createAdmin(adminDto);

      return res
        .status(200)
        .json({ message: " Admin created Successfully ", data: admin });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e });
    }
  };
}
