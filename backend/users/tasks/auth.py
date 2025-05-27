import logging

from celery import shared_task
from django.conf import settings
from django.core.mail import send_mail, EmailMessage
from django.template.loader import render_to_string

logger = logging.getLogger(__name__)


@shared_task
def send_email_task(subject, message, recipient_list, html_message):
    try:
        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            recipient_list,
            html_message = html_message,
            fail_silently = False,
        )
    except Exception as e:
        logger.error(f'ERROR: {e}')
        raise


@shared_task
def reset_password_task(email, uid, token, name):
    try:
        # шаблон
        template_name = 'reset_password.html'

        context = {
            'protocol': settings.PROTOCOL,
            'domain': settings.DOMAIN,
            'email': email,
            'path': settings.RESET_PASSWORD_PATH,
            'uid': uid,
            'token': token,
            'name': name
        }
        mail_subject = 'Восстановление пароля'
        email_content = render_to_string(template_name, context)

        email_message = EmailMessage(
            subject = mail_subject,
            body = email_content,
            to = [email],
        )

        email_message.content_subtype = 'html'
        email_message.send()

        return 'send'
    except Exception as error:
        logger.error(f'ERROR: {error}')
        raise
