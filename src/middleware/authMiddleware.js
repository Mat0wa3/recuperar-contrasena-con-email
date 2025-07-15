import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    req.session = { user: null }

    if (!token) return res.redirect('/')

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.session.user = decoded
    } catch { return res.redirect('/') }
    next()
}