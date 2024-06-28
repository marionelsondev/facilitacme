from rest_framework import serializers
from .models import Material, Failure

# Serializador para o modelo Material
class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = '__all__'  # Inclui todos os campos do modelo

# Serializador para o modelo Failure
class FailureSerializer(serializers.ModelSerializer):
    material = serializers.PrimaryKeyRelatedField(queryset=Material.objects.all())  # Permite a edição do campo material
    material_name = serializers.SerializerMethodField()  # Adiciona o campo para exibir o nome do material

    class Meta:
        model = Failure
        fields = '__all__'  # Inclui todos os campos do modelo

    # Método para obter o nome do material
    def get_material_name(self, obj):
        return obj.material.name