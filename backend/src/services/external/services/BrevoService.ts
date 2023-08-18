import { Model } from "sequelize";
import { apiInstance as emailClient, sendSmtpEmail as emailBuilder} from "../clients/brevo";


class BrevoService{

  async sendResetPassword(user: Model, newPass: string){
	
    const SibApiV3Sdk = require("sib-api-v3-sdk");
    const defaultClient = SibApiV3Sdk.ApiClient.instance;

    const apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = "api-key";

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = "Password Recover Study.io";
    sendSmtpEmail.htmlContent = "<html><body><h1>Hi! You sent a request to recover your password.\n This is your new passowrd: "+newPass+"</h1></body></html>";
    sendSmtpEmail.sender = {"name":"Study IO","email":"no-reply@study.io"};
    sendSmtpEmail.to = [{"email":user.get("email"),"name":user.get("name")}];

    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data: any) {
      console.log("API called successfully. Returned data: " + JSON.stringify(data));
    },function(error: any) {
      console.error(error);
    });
  }
}

export default new BrevoService;
