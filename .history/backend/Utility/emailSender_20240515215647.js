const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'notMonkeytype@gmail.com',
                pass: 'vgkw lmdu aazc yocm'
            }
        });

        const emailBodyHTML = `
        <body style="margin: 0; padding: 0; font-family: 'Poppins', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; display: flex; justify-content: center; align-items: center; min-height: 100vh;">

        <div style="max-width: 1000px; background-color: #ffffff; padding: 24px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); border-radius: 12px; color: #212529;">
    
            <div style="text-align: center;">
                <div style="overflow: hidden; border-radius: 12px; margin-bottom: 24px; max-height: 50vh;">
                </div>          
            </div>
            <div style="margin-bottom: 24px; text-align: center;margin-bottom:140px ; color: #6c757d;">
                <h1 style="font-size: 28px; font-weight: bold; margin: 0 0 16px; color: #343a40;">Email From Shaaf Salman</h1>
                <p style="margin-bottom: 24px;font-size: 18px; font-weight: normal">We're thrilled to have you onboard:</p>
                <div style="background: linear-gradient(45deg, rgba(136, 0, 204, 0.8), rgba(240, 23, 222, 0.8)); backdrop-filter: blur(10px);margin-left:20%; width:60%;padding: 16px; border-radius: 8px; text-align: center;">
                </div>
            </div>
        </div>
        </body>
        `;

        const mailOptions = {
            from: 'notMonkeytype@gmail.com',
            to: email,
            subject: 'Email Verification',
            html: emailBodyHTML
        };

        await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully');
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};

module.exports.sendVerificationEmail = sendVerificationEmail;
