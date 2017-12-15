import * as sendgrid from 'sendgrid'; //when we have types
const helper = sendgrid.mail;
const sg = sendgrid(process.env.SENDGRID_API_KEY || ''); //the || '' SATISFIES TYPESCRIPT 

export function sendEmail(to: string, from: string, subject: string, message: string) {
  console.log("inside email service");
  console.log(from);
  console.log(message);
  
    let toEmail = new helper.Email(to);
    let fromEmail = new helper.Email(from);
    let emailContent = new helper.Content('text/html', message);
    
    let mail = new helper.Mail(fromEmail, subject, toEmail, emailContent);

    let request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    return sg.API(request);//result will be a promise
}
