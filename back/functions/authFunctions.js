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

const decode = (req,res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({ status: false, message: "Token is missing." });
    } else {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                return res.status(403).json({ status: false, message: "Token is invalid or expired." });
            } else {
                const decodedData = decoded
                return res.status(200).json({status:true,data:decodedData})
            }
        });
    }
}

const logout = (req,res) => {
    res.clearCookie('token')
    return res.status(200)
}
module.exports = { isAuthenticated , isAdmin , decode ,logout }