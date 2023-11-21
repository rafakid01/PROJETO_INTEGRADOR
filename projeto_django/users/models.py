from django.db import models


# Create your models here.
class Usuarios(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=45)
    email = models.EmailField(unique=True, max_length=45)
    senha = models.CharField(max_length=45)
    curso = models.CharField(max_length=45)
    categoria = models.CharField(max_length=45)
    contato_numero1 = models.CharField(max_length=11, blank=True)
    contato_numero2 = models.CharField(max_length=11, blank=True)
    foto_perfil = models.BinaryField(null=True, blank=True)

    class Meta:
        db_table = "usuarios"

    def __str__(self):
        return self.nome
