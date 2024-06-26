from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MaterialViewSet, FailureViewSet

router = DefaultRouter()
router.register(r'materials', MaterialViewSet)
router.register(r'failures', FailureViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('failures/generate_report/', FailureViewSet.as_view({'get': 'generate_report'}), name='generate_failure_report'),
    path('materials/pdf_report/', MaterialViewSet.as_view({'get': 'pdf_report'}), name='generate_material_report'),
]