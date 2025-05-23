from django.contrib import admin, messages
from django.contrib.auth.models import Group
from unfold.admin import ModelAdmin

from users.models.user import UserAccount

admin.site.unregister(Group)


@admin.action(description = 'Подтвердить выбранного пользователя')
def confirm_user(modeladmin, request, queryset):
    for user in queryset:
        UserAccount.objects.approve_user(user)
        modeladmin.message_user(
            request,
            f'Пользователь(и) {user} подтверждён(ы)',
            messages.SUCCESS
        )


@admin.register(UserAccount)
class UserAccountAdmin(ModelAdmin):
    """
    Конфигурация модели UserAccount для административной панели.
    """
    actions = (confirm_user,)

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if request.user.is_superuser:
            return queryset
        return queryset.filter(
            role = UserAccount.Role.REGIONAL_DIRECTOR,
            regions__owner = request.user
        ).distinct()
