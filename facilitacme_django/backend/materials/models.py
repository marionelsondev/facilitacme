from django.db import models

class Material(models.Model):
    name = models.CharField(max_length=100)  # Nome do material
    material_type = models.CharField(max_length=50)  # Tipo do material
    current_stage = models.CharField(max_length=50, choices=[
        ('RECEIVING', 'Recebimento'),
        ('WASHING', 'Lavagem'),
        ('PREPARATION', 'Preparo'),
        ('DISTRIBUTION', 'Distribuição'),
    ])  # Etapa atual
    stages_history = models.TextField(blank=True)  # Histórico de etapas

    def save(self, *args, **kwargs):
        if not self.stages_history:
            self.stages_history = self.current_stage
        else:
            if self.current_stage not in self.stages_history.split(" -> "):
                self.stages_history += f" -> {self.current_stage}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Failure(models.Model):
    description = models.TextField()
    stage = models.CharField(max_length=50, choices=[
        ('RECEIVING', 'Recebimento'),
        ('WASHING', 'Lavagem'),
        ('PREPARATION', 'Preparo'),
        ('DISTRIBUTION', 'Distribuição'),
    ])  # Etapa da falha
    material = models.ForeignKey(Material, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.material.name} - {self.stage}"