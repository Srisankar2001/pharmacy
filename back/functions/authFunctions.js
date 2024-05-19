const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')


dotenv.config()
const key = process.env.key


const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({ status: false, message: "Token is missing." });
    } else {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                return res.status(403).json({ status: false, message: "Token is invalid or expired." });
            } else {
                next(); 
            }
        });
    }
};

const isAdmin = (req,res,next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({ status: false, message: "Token is missing." });
    } else {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                return res.status(403).json({ status: false, message: "Token is invalid or expired." });
            } else {
                if(decoded.role === "ADMIN"){
                    next()
                }else{
                    return res.status(403).json({status:false,message:"User is not allowed to access"})
                }
            }
        });
    }
}

const isUser = (req,res,next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({ status: false, message: "Token is missing." });
    } else {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                return res.status(403).json({ status: false, message: "Token is invalid or expired." });
            } else {
                if(decoded.role === "USER"){
                    next()
                }else{
                    return res.status(403).json({status:false,message:"Admin is not allowed to access"})
                }
            }
        });
    }
}


const decode = (req,res,next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({ status: false, message: "Token is missing." });
    } else {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                return res.status(403).json({ status: false, message: "Token is invalid or expired." });
            } else {
                req.decoded =  decoded
                next()
            }
        });
    }
}


module.exports = { isAuthenticated , isAdmin , decode , isUser  }