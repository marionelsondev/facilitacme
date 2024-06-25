from django.db import models

# Model for Material
class Material(models.Model):
    name = models.CharField(max_length=100) # Material name
    material_type = models.CharField(max_legnth=50) # Material type (surgical, disposable, etc.)
    traceability = models.CharField(max_length=200) # Traceability information

    def __str__(self):
        return self.name
    
# Model for Stages
class Stage(models.Model):
    # Constant for stage choices
    STAGE_CHOICES = [
        ('RECEIVING', 'Recebimento'),
        ('WASHING', 'Lavagem'),
        ('PREPARATION', 'Preparo'),
        ('DISTRIBUTION', 'Distribuição'),
    ]
    material = models.ForeignKey(Material, on_delete=models.CASCADE) # Link to Material
    description = models.TextField() # Description of the failure
    stage = models.CharField(max_length=50, choices=Stage.STAGE_CHOICES) # Stage where the failure occurred