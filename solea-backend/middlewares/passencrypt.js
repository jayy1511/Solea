const bcrypt = require('bcryptjs');

exports.hashPassword = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const plainPassword = req.body.password;

    if (!plainPassword) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    req.body.password = hashedPassword;

    console.log('🔐 Password hashed');
    next();
  } catch (err) {
    console.error('Hashing error:', err.message);
    res.status(500).json({ message: 'Error hashing password' });
  }
};
