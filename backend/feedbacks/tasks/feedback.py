from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings

from feedbacks.models.feedback import Feedback, FeedbackOrganization


@shared_task
def send_feedback_email(feedback_id=None, organization_id=None):

    context = {
        'protocol': settings.PROTOCOL,
        'domain': settings.DOMAIN,
    }

    subject = 'Заявка StreetRussia'
    to_email = ['denis.lukianov1801@gmail.com']  # адреса получателей

    if feedback_id:
        feedback = Feedback.objects.get(id=feedback_id)
        context['feedback'] = feedback
        subject = f"Новая заявка обратной связи от {feedback.name}"

    elif organization_id:
        feedback_organization = FeedbackOrganization.objects.get(id=organization_id)
        context['feedback_organization'] = feedback_organization
        subject = f"Новая заявка от организации: {feedback_organization.last_name} {feedback_organization.first_name}"

    else:
        return  # нет данных — ничего не отправляем

    html_content = render_to_string("response_feedback.html", context)

    email = EmailMultiAlternatives(
        subject=subject,
        body="Это HTML-письмо. Включите поддержку HTML.",
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=to_email,
    )
    email.attach_alternative(html_content, "text/html")
    email.send()
