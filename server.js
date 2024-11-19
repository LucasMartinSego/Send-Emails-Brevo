import brevo from '@getbrevo/brevo';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const sendinblueApiKey = process.env.SENDINBLUE_API_KEY;

const filePath = './message.html';
const apiInstance = new brevo.TransactionalEmailsApi();

const message = {
    data: {
        from: "lucasmartinsego@gmail.com",
        to: "luks7777martin@gmail.com",
        msg: "",
    }
};

try {
    const data = fs.readFileSync(filePath, 'utf8');
    console.log('Contenido del archivo HTML:');
    console.log(data);

    message.data.msg = data;
} catch (err) {
    console.error('Error al leer el archivo:', err);
}

const apiKey = sendinblueApiKey;

apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

const sendSmtpEmail = new brevo.SendSmtpEmail();
sendSmtpEmail.subject = "Hello world from Brevo and Node.js";
sendSmtpEmail.to = [
    { email: message.data.to, name: "Ray Ray" }
];
sendSmtpEmail.htmlContent = message.data.msg;
sendSmtpEmail.sender = {
    name: "Lucas",
    email: message.data.from
};

async function sendEmail() {
    try {
        const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log(result);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
}

sendEmail();
