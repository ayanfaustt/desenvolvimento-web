import 'dotenv/config';

const {BREVO_KEY} = process.env;

const SibApiV3Sdk = require('sib-api-v3-sdk'); 
let defaultClient = SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = BREVO_KEY;
export const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
export const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
