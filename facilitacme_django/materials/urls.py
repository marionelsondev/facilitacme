from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MaterialViewSet, FailureViewSet

router = DefaultRouter()
router.register(r'materials', MaterialViewSet)
router.register(r'failures', FailureViewSet)

urlpatterns = [
    path('', include(router.urls)),
]