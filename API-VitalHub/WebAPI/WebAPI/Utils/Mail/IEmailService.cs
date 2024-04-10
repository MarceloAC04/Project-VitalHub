namespace WebAPI.Utils.Mail
{
    public interface IEmailService
    {
        //metodo assicrono para envio de email que recebe MailRequest
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
