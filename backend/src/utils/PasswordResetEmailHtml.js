const passwordResetEmailHTML = (resetUrl, userName = "User") => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <title>Password Reset</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f6f6f6;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 30px auto;
                background-color: #ffffff;
                padding: 25px;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                color: #b76e79;
                font-size: 24px;
                font-weight: bold;
            }
            .content {
                margin-top: 20px;
                color: #333333;
                line-height: 1.6;
            }
            .btn {
                display: inline-block;
                margin: 25px 0;
                padding: 12px 25px;
                background-color: #b76e79;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
            }
            .footer {
                margin-top: 30px;
                font-size: 12px;
                color: #777777;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                Wedding Management Application 💍
            </div>

            <div class="content">
                <p>Hello ${userName},</p>

                <p>
                    We received a request to reset the password for your
                    <strong>Wedding Management Application</strong> account.
                </p>

                <p>
                    Click the button below to securely reset your password:
                </p>

                <p style="text-align:center;">
                    <a href="${resetUrl}" class="btn">Reset Password</a>
                </p>

                <p>
                    This link is valid for a limited time for security reasons.
                    If you did not request this, please ignore this email.
                </p>

                <p>
                    For your security, never share your password with anyone.
                </p>

                <p>
                    Wishing you a smooth and stress-free wedding planning experience 💐
                </p>
            </div>

            <div class="footer">
                © ${new Date().getFullYear()} Wedding Management Application  
                <br />
                Making wedding planning simple and joyful
            </div>
        </div>
    </body>
    </html>
    `
}
export default passwordResetEmailHTML;