from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MaterialViewSet, FailureViewSet

router = DefaultRouter()
router.register(r'materials', MaterialViewSet)  # Rota para materiais
router.register(r'failures', FailureViewSet)  # Rota para falhas

urlpatterns = [
    path('', include(router.urls)),  # Inclui as rotas do roteador
    path('failures/generate_report/', FailureViewSet.as_view({'get': 'generate_report'}), name='generate_failure_report'),  # Rota para gerar relatório de falhas
    path('materials/pdf_report/', MaterialViewSet.as_view({'get': 'pdf_report'}), name='generate_material_report'),  # Rota para gerar relatório de materiais
]