const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Email not found' });

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
      }
    });

    const mailOptions = {
      to: user.email,
      from: 'passwordreset@yourdomain.com',
      subject: 'Password Reset',
      text: `اضغط على الرابط التالي لإعادة تعيين كلمة المرور:\n\n
      http://localhost:3000/reset/${token}\n\n
      إذا لم تطلب إعادة تعيين، تجاهل هذا البريد.`
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) return res.status(500).json({ error: error.message });
      res.json({ message: 'Password reset email sent' });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ error: 'Token invalid or expired' });

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
