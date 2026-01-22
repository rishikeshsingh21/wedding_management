import nodemailer from 'nodemailer'
import ApiError from './ApiError.js'

const sendEmail = async ({to,subject,html}) =>{
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure:false,
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
        })
        //console.log(process.env.EMAIL_USER)
        //console.log(process.env.EMAIL_PASS)

        const mailOptions = {
            from: `"Wedding management" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        }
        await transporter.verify();
        console.log("SMTP connection is ready!");


        const info = await transporter.sendMail(mailOptions)
        console.log("Email send",info.messageId)
    }catch(err){
        console.log("Error while sending the email",err)
        throw new ApiError(
            500,
            "Internal Server Error"
        )
    }
}

export default sendEmail