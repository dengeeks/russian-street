from rest_framework.throttling import UserRateThrottle, AnonRateThrottle


class FeedbackRateThrottle(AnonRateThrottle):
    scope = 'feedback_create'


class FeedbackOrganizationRateThrottle(UserRateThrottle):
    scope = 'feedback_org_create'
