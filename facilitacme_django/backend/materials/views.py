from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import FileResponse
from .models import Material, Failure
from .serializers import MaterialSerializer, FailureSerializer
from .utils import generate_material_report, generate_failure_report_xlsx

class MaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer

    @action(detail=True, methods=['get'])
    def stage_history(self, request, pk=None):
        material = self.get_object()
        return Response({'stages_history': material.stages_history})

    @action(detail=False, methods=['get'])
    def pdf_report(self, request):
        filename = generate_material_report()
        if filename:
            response = FileResponse(open(filename, 'rb'), content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="{filename}"'
            return response
        return Response({'error': 'No materials have completed the process.'}, status=400)

class FailureViewSet(viewsets.ModelViewSet):
    queryset = Failure.objects.all()
    serializer_class = FailureSerializer

    @action(detail=False, methods=['get'])
    def generate_report(self, request):
        filename = generate_failure_report_xlsx()
        if filename:
            response = FileResponse(open(filename, 'rb'), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = f'attachment; filename="{filename}"'
            return response
        return Response({'error': 'No failures found.'}, status=404)