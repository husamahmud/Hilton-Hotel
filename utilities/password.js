import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
	return bcrypt.hashSync(password, Number(process.env.HASH_SECRET))
}

export const comparePasswords = async (password, hashed) => {
	if (!password || !hashed) return false

	return bcrypt.compareSync(password, hashed)
}
