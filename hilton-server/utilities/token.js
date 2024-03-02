import jwt from 'jsonwebtoken'

export const createToken = (dto, duration) => {
	return jwt.sign({
		id: dto.id, email: dto.email, role: dto.role
	}, process.env.TOKEN_SECRET, {expiresIn: duration})
}

export const verifyToken = (req, res, next) => {
	const authHeader = req.headers['authorization']
	const token = authHeader?.split(' ')[1]

	if (!token) return res.status(401).send('Access Denied')

	try {
	const user = jwt.verify(token, process.env.TOKEN_SECRET)

	req.user = user
	next()
	}
	catch (err) {
		res.status(400).send('Invalid Token')

		// TODO : Refresh Token Assurances
	}
}


// TODO Authorization

