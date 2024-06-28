from django.contrib import admin
from .models import Material, Failure

# Configuração do painel de administração para o modelo Material
@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ('name', 'material_type', 'current_stage')  # Campos exibidos na lista de materiais
    list_filter = ('material_type', 'current_stage')  # Filtros laterais
    search_fields = ('name',)  # Campos de pesquisa

# Configuração do painel de administração para o modelo Failure
@admin.register(Failure)
class FailureAdmin(admin.ModelAdmin):
    list_display = ('description', 'stage', 'material')  # Campos exibidos na lista de falhas
    list_filter = ('stage', 'material')  # Filtros laterais
    search_fields = ('description', 'material__name')  # Campos de pesquisa