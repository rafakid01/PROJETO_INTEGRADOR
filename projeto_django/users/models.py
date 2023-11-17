from django.db import models

# Create your models here.


class Usuario(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=50)
    curso = models.CharField(max_length=20)
    categoria = models.CharField(max_length=7)
    contato_nunmero1 = models.CharField(max_length=11)
    contato_nunmero2 = models.CharField(max_length=11)
    foto_perfil = models.BinaryField(null = True, blank=True)