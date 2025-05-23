from rest_framework import serializers

from partners.models.partner import Partner


class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = ('id', 'name', 'image', 'description', 'type')
