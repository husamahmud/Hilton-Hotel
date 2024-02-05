import {AdminDao} from '../models/dao/admin.dao';
import {AdminDto} from '../models/dto/admin.dto'
import {AdminValidation} from '../middlewares/validations/admin.validate';
import {hashPassword} from '../utilities/password';

export class AdminController {
	// TODO multer
	static createAdmin = async (req, res) => {
		req.body.password = hashPassword(req.body.password)
		const adminDto = new AdminDto(req.body)
		console.log(adminDto)
	}
}
