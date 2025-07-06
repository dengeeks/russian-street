from django.urls import path

from feedbacks.views.feedback import FeedbackCreateAPI, FeedbackOrganizationCreateAPI

urlpatterns = [
    path('feedback/question/', FeedbackCreateAPI.as_view()),
    path('feedback/organization/', FeedbackOrganizationCreateAPI.as_view()),
]
