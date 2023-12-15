import { expressjwt } from "express-jwt";
import * as jwt from "jsonwebtoken"
import { AuthError } from "./errors/AuthError";
import { ClientError } from "./errors/ClientError";

const AuthUtil = {
    generateToken: (payload) => {
        // var privateKey = fs.readFileSync('private.key');
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d",
            algorithm: 'HS256',
        });
        return token
    },
    validateToken: (payload) => {
        const decoded = jwt.verify(payload, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            throw new AuthError("Token tidak valid")
        }
        const { id, firstname, role } = decoded as jwt.JwtPayload
        return { id, firstname, role }
    },
    jwtMiddleware: () => {
        return expressjwt({
            secret: process.env.JWT_SECRET_KEY, 
            algorithms: ['HS256'], 
            credentialsRequired: true, 
            getToken: (req) => {
                if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
                    return req.headers.authorization.split(" ")[1];
                } 
                return undefined;
            },
            onExpired: (req) => {
                throw new AuthError('Token expired, please login again!')
            },
        });
    }
}

export = AuthUtil