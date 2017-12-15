import * as sendgrid from 'sendgrid'; //when we have types
const helper = sendgrid.mail;
const sg = sendgrid(process.env.SENDGRID_API_KEY || ''); //the || '' SATISFIES TYPESCRIPT 

console.log(process.env.SENDGRID_API_KEY);

export function sendEmail(to: string, from: string, subject: string, message: string) {
  console.log("inside email service");
  
    let toEmail = new helper.Email(to);
    let fromEmail = new helper.Email(from);
    let emailContent = new helper.Content('text/html', message);

    console.log(toEmail);
    console.log(fromEmail);
    console.log(emailContent);
    
    let mail = new helper.Mail(fromEmail, subject, toEmail, emailContent);

    let request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    return sg.API(request);//result will be a promise
}
