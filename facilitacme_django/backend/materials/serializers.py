from rest_framework import serializers
from .models import Material, Failure

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = '__all__'

class FailureSerializer(serializers.ModelSerializer):
    material = serializers.PrimaryKeyRelatedField(queryset=Material.objects.all())

    class Meta:
        model = Failure
        fields = '__all__'