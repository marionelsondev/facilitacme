from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import FileResponse
from .models import Material, Failure
from .serializers import MaterialSerializer, FailureSerializer
from .utils import generate_material_report, generate_failure_report_xlsx

# ViewSet para o modelo Material
class MaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all()  # Consulta todos os materiais
    serializer_class = MaterialSerializer  # Define o serializador a ser usado

    # Ação personalizada para obter o histórico de etapas de um material
    @action(detail=True, methods=['get'])
    def stage_history(self, request, pk=None):
        material = self.get_object()
        return Response({'stages_history': material.stages_history})

    # Ação personalizada para gerar relatório em PDF
    @action(detail=False, methods=['get'])
    def pdf_report(self, request):
        filename = generate_material_report()
        if filename:
            response = FileResponse(open(filename, 'rb'), content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="{filename}"'
            return response
        return Response({'error': 'No materials have completed the process.'}, status=400)

# ViewSet para o modelo Failure
class FailureViewSet(viewsets.ModelViewSet):
    queryset = Failure.objects.all()  # Consulta todas as falhas
    serializer_class = FailureSerializer  # Define o serializador a ser usado

    # Ação personalizada para gerar relatório em XLSX
    @action(detail=False, methods=['get'])
    def generate_report(self, request):
        filename = generate_failure_report_xlsx()
        if filename:
            response = FileResponse(open(filename, 'rb'), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = f'attachment; filename="{filename}"'
            return response
        return Response({'error': 'No failures found.'}, status=404)