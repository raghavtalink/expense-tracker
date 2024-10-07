const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
   const token = req.header('Authorization');
   if (!token) return res.status(401).send({ message: 'Access denied' });

   try {
       const verified = jwt.verify(token, process.env.JWT_SECRET);
       req.user = await User.findById(verified.id);
       next();
   } catch (err) {
       res.status(400).send({ message: 'Invalid token' });
   }
};

module.exports = auth;
