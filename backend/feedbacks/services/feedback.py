from feedbacks.models.feedback import Feedback, FeedbackOrganization
from feedbacks.tasks.feedback import send_feedback_email
from regions.models.region import Region, City


class FeedbackService:
    @classmethod
    def create(cls, validated_data):
        instance = Feedback.objects.create(**validated_data)
        send_feedback_email.delay(feedback_id = str(instance.id))
        return instance


class FeedbackOrganizationService:
    @classmethod
    def create(cls, validated_data, user):
        region = Region.objects.get(id = validated_data.pop('region_id'))
        city = City.objects.get(id = validated_data.pop('city_id'))
        instance = FeedbackOrganization.objects.create(region = region, city = city, user = user, **validated_data)
        send_feedback_email.delay(organization_id = str(instance.id))
        return instance
