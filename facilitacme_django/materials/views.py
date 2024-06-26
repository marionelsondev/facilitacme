from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Material, Failure
from .serializers import MaterialSerializer, FailureSerializer

class MaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer

    @action(detail=True, methods=['get'])
    def stages(self, request, pk=None):
        material = self.get_object()
        return Response({'stages_history': material.stages_history}) # Retorna o histórico de etapas do material

class FailureViewSet(viewsets.ModelViewSet):
    queryset = Failure.objects.all()
    serializer_class = FailureSerializer