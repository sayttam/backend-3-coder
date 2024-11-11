import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    const token = req.cookies.coderCookie;
    
    if (!token) {
        return res.status(401).send({ error: 'Debes estar logueado para realizar esta accion' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send({ error: 'Token inválido o expirado' });
        }
        req.user = user;
        next();
    });
};

export default authenticate;
