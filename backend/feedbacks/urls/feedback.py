from django.urls import path

from feedbacks.views.feedback import FeedbackCreateAPI, FeedbackOrganizationCreateAPI

urlpatterns = [
    # заявки (вопросы)
    path('feedback/question/', FeedbackCreateAPI.as_view()),
    # заявки на вступление в орг
    path('feedback/organization/', FeedbackOrganizationCreateAPI.as_view()),
]
