from rest_framework import serializers
from .models import Material, Failure

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['id', 'name', 'material_type', 'current_stage', 'stages_history']

class FailureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Failure
        fields = ['id', 'description', 'stage', 'material']