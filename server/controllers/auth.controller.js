const User = require('../models/user.model.js');
//const { expressjwt: jwt } = require("express-jwt");
const config = require('./../../config/config.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signin = async (req, res) => {
    try {
        console.log('Attempting to find user with email:', req.body.email);
        let user = await User.findOne({ "email": req.body.email });
        console.log('User found:', user); // Debug log

        if (!user) {
            console.log('User not found');
            return res.status(401).json({ error: "User not found" });
        }

        if (!bcrypt.compareSync(req.body.password, user.hashed_password)) {
            console.log('Password mismatch');
            return res.status(401).send({ error: "Email and password don't match." });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '999h' });
        console.log('Token:', token); 
        res.cookie('t', token, { expire: new Date() + 9999 });

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.error('Error signing in:', err);
        return res.status(401).json({ error: "Could not sign in" });
    }
};


const signout = (req, res) => {
    //res.clearCookie("t");
    return res.status(200).json({
        message: "signed out"
    });
};


const requireSignin = (req, res, next) => {
    jwt.verify(req.cookies.t, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          error: 'Access denied'
        });
      }
      req.auth = decoded;
      next();
    });
  };
  


const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;

    if (!authorized) {
        return res.status(403).json({
            error: "User is not authorized"
        });
    }
    next();
};

module.exports = { signin, signout, requireSignin, hasAuthorization };
