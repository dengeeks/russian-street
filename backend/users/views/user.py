from rest_framework import generics, permissions

from users.serializers.user import UserAccountSerializer


class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserAccountSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
