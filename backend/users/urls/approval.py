from django.urls import path

from users.views.approval import UserApprovalView

urlpatterns = [
    path(
        'user/approve/<int:pk>/',
        UserApprovalView.as_view(),
        name = 'useraccount-approve'
    )
]
