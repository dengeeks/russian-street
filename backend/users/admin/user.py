from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from unfold.admin import ModelAdmin
from unfold.forms import UserChangeForm, AdminPasswordChangeForm
from unfold.widgets import UnfoldAdminPasswordInput

from common.admin import LinkToDetailMixin
from users.admin.social import SocialLinkManagerInline
from users.models.user import UserAccount

admin.site.unregister(Group)


class CustomUserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label = 'Пароль', widget = forms.PasswordInput)
    password2 = forms.CharField(label = 'Подтверждение пароля', widget = forms.PasswordInput)

    def __init__(
            self,
            *args,
            **kwargs,
    ) -> None:
        super().__init__(*args, **kwargs)

        self.fields["password1"].widget = UnfoldAdminPasswordInput(
            attrs = {"autocomplete": "new-password"}
        )
        self.fields["password2"].widget = UnfoldAdminPasswordInput(
            attrs = {"autocomplete": "new-password"}
        )

    class Meta:
        model = UserAccount
        fields = (
            'email',
            'role',
            'first_name',
            'last_name',
            'middle_name',
            'phone_number',
            'region',
            'address',
            'info',
            'avatar',
            'is_active',
            'is_staff',
            'is_superuser',
        )

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Пароли не совпадают")
        return password2

    def save(self, commit = True):
        user = super().save(commit = False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


@admin.register(UserAccount)
class UserAccountAdmin(BaseUserAdmin, LinkToDetailMixin, ModelAdmin):
    list_display = [
        'link_to_detail',
        'email',
        'first_name',
        'last_name',
        'role',
        'region',
        'status',
        'is_staff',
        'is_superuser'
    ]
    fieldsets = (
        ('Основная информация', {
            'fields': (
                'avatar',
                'email',
                'password'
            )
        }),
        ('Персональные данные', {
            'fields': (
                'first_name',
                'last_name',
                'middle_name',
                'phone_number',
                'info'
            )
        }),
        ('Рабочая информация', {
            'fields': (
                'role',
                'region',
                'address',
                'status'
            )
        }),
        ('Права доступа', {
            'fields': (
                'is_active',
                'is_staff',
                'is_superuser',
                'groups',
                'user_permissions'
            )
        }),
        ('Системная информация', {
            'fields': (
                'uuid',
                'last_login',
                'created_at',
                'updated_at'
            ),
            'classes': ('collapse',)
        }),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'role'),
        }),
        ('Персональные данные (обязательно для администраторов)', {
            'fields': (
                'first_name',
                'last_name',
                'middle_name',
                'phone_number'
            )
        }),
        ('Рабочая информация (обязательно для администраторов)', {
            'fields': (
                'region',
                'address',
                'info',
                'avatar'
            )
        }),
        ('Права доступа', {
            'fields': (
                'is_active',
                'is_staff',
                'is_superuser',
            )
        }),
    )
    list_filter = (
        'role',
        'is_staff',
        'is_superuser',
        'status',
        'region'
    )
    readonly_fields = [
        'last_login',
        'created_at',
        'updated_at',
        'uuid',
        'link_to_detail'
    ]
    ordering = ['-created_at']
    form = UserChangeForm
    change_password_form = AdminPasswordChangeForm
    add_form = CustomUserCreationForm
    inlines = [SocialLinkManagerInline]
