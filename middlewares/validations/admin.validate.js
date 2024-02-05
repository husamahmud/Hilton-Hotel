const Joi = require('joi');

export class AdminValidation {
	static createAdmin(adminDto) {
		const schema = Joi.object({
			fullName: Joi.string().min(6).max(80).required().trim(),
			email: Joi.string().email().required().trim(),
			password: Joi.string().min(8).max(25).required(),
			profilePic: Joi.string().min(5).max(255), // TODO url, cloud
			birthDate: Joi.date().required(), // TODO: format('YYYY-MM-DD').
			phoneNum: Joi.string().required(),
			isDeleted: Joi.boolean().default(false)
		})

		return schema.validateAsync(adminDto)
	}

	static updateAdmin(adminDto) {
		const schema = Joi.object({
			fullName: Joi.string().min(6).max(80).trim(),
			email: Joi.string().email().trim(),
			password: Joi.string().min(8).max(25),
			profilePic: Joi.string().min(5).max(255),
			birthDate: Joi.date(),
			phoneNum: Joi.string(),
			isDeleted: Joi.boolean().default(false)
		})

		return schema.validateAsync(adminDto)
	}
}

// const schema = Joi.date().format('YYYY-MM-DD').utc();
