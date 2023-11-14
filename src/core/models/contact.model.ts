export class ContactModel{
    name: string = "";
    email: string = process.env.VUE_APP_BASE_EMAIL;
    subject: string = "";
    message: string = "";
}