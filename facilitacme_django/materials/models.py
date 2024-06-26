from django.db import models

class Material(models.Model):
    name = models.CharField(max_length=100)  # Nome do material
    material_type = models.CharField(max_length=100)  # Tipo do material
    current_stage = models.CharField(
        max_length=50,
        choices=[
            ('RECEIVING', 'Recebimento'),
            ('WASHING', 'Lavagem'),
            ('PREPARATION', 'Preparo'),
            ('DISTRIBUTION', 'Distribuição'),
        ],
        default='RECEIVING'
    )  # Etapa atual do processo
    stages_history = models.TextField(default='Recebimento')  # Histórico de etapas

class Failure(models.Model):
    description = models.CharField(max_length=200)  # Descrição da falha
    stage = models.CharField(
        max_length=50,
        choices=[
            ('RECEIVING', 'Recebimento'),
            ('WASHING', 'Lavagem'),
            ('PREPARATION', 'Preparo'),
            ('DISTRIBUTION', 'Distribuição'),
        ]
    )  # Etapa onde a falha ocorreu
    material = models.ForeignKey(Material, related_name='failures', on_delete=models.CASCADE)  # Material relacionado