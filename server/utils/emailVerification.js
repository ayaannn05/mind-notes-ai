const Token = require('../model/tokenModel')
const crypto = require('crypto')
const sendEmail = require('./sendEmail')
exports.emailVerification = async (user, res) => {
    var token = new Token({
        userId: user._id,
        token: crypto.randomBytes(16).toString('hex'),
    });
    await token.save();
    const resetUrl = `${process.env.CLIENT_URL}/verify-email/${token.token}`;
    const name = user.name;

    const emailContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .email-header {
                    background-color: #fa8b23;
                    color: white;
                    text-align: center;
                    padding: 20px;
                }
                .email-header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .email-body {
                    padding: 20px;
                    color: #333333;
                    line-height: 1.6;
                }
                .email-body a {
                    display: inline-block;
                    margin: 20px 0;
                    padding: 10px 15px;
                    background-color: #fa8b23;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    font-size: 16px;
                }
                .email-body a:hover {
                    background-color: #e97a19;
                }
                .email-footer {
                    background-color: #f4f4f4;
                    text-align: center;
                    padding: 15px;
                    font-size: 14px;
                    color: #777777;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">
                    <h1>Welcome to ${process.env.APP_NAME}, ${name}!</h1>
                </div>
                <div class="email-body">
                    <p>We're thrilled to have you on board. Please confirm your email address to get started:</p>
                    <a href="${resetUrl}">Verify My Account</a>
                    <p>If you did not create an account, you can safely ignore this email.</p>
                </div>
                <div class="email-footer">
                    <p>&copy; ${new Date().getFullYear()} ${process.env.APP_NAME}. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;

    await sendEmail({
        email: user.email,
        subject: `${process.env.APP_NAME} - Account Verification Link`,
        message: emailContent, // This is for plain text clients
        html: emailContent,    // This is for HTML-capable email clients
    });

    res.status(200).json({
        status: 'success',
        message: 'Email verification link sent to your email',
    });
};