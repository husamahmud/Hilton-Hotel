import jwt from 'jsonwebtoken'

export const createToken = (dto, duration) => {
	return jwt.sign({
		id: dto.id, email: dto.email, role: dto.role
	}, process.env.TOKEN_SECRET, {expiresIn: duration})
}

// TODO verify token
