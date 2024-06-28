from django.db import models

# Modelo Material
class Material(models.Model):
    MATERIAL_TYPE_CHOICES = [
        ('Instrumental', 'Instrumental'),
        ('Descartável', 'Descartável'),
        ('Equipamento', 'Equipamento'),
        ('Cirúrgico', 'Cirúrgico')
    ]

    name = models.CharField(max_length=100)  # Nome do material
    material_type = models.CharField(max_length=50, choices=MATERIAL_TYPE_CHOICES)  # Tipo do material
    current_stage = models.CharField(max_length=50, choices=[
        ('RECEBIMENTO', 'Recebimento'),
        ('LAVAGEM', 'Lavagem'),
        ('PREPARO', 'Preparo'),
        ('DISTRIBUIÇÃO', 'Distribuição'),
    ])  # Etapa atual
    stages_history = models.TextField(blank=True)  # Histórico de etapas

    def save(self, *args, **kwargs):
        # Atualiza o histórico de etapas ao salvar o material
        if not self.stages_history:
            self.stages_history = self.current_stage
        else:
            if self.current_stage not in self.stages_history.split(" -> "):
                self.stages_history += f" -> {self.current_stage}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name  # Retorna o nome do material como sua representação

# Modelo Failure
class Failure(models.Model):
    description = models.TextField()  # Descrição da falha
    stage = models.CharField(max_length=50, choices=[
        ('RECEBIMENTO', 'Recebimento'),
        ('LAVAGEM', 'Lavagem'),
        ('PREPARO', 'Preparo'),
        ('DISTRIBUIÇÃO', 'Distribuição'),
    ])  # Etapa da falha
    material = models.ForeignKey(Material, on_delete=models.CASCADE)  # Material relacionado à falha

    def __str__(self):
        return f"{self.material.name} - {self.stage}"  # Retorna a descrição da falha como sua representação