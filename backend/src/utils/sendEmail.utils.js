import { Resend } from "resend";

const resend = new Resend("re_KhHfJz8c_32JnYspX4Gi8mLwz8JqMEdHK");

const sendEmail = async (to, subject, text) => {
  await resend.emails.send({
    from: "onboarding@resend.dev", // works without domain
    to,
    subject,
    text,
  });
};

export default sendEmail;




// import nodemailer from "nodemailer"

// const sendEmail=async({to,subject,html})=>{
//     const transporter=nodemailer.createTransport({
//         service:"gmail",
//         auth:{
//             user: process.env.EMAIL_USER, // your email
//             pass: process.env.EMAIL_PASS, // app password
//         }
//     })
//     await transporter.sendMail({
//          from: `"Notes App" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html,
//     })
// }

// export default sendEmail

